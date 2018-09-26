import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import { inject } from '@ember/service';

import rootFolders from 'leads-manage/gql/queries/fuel/exclusion-folders';
import deFolderQuery from 'leads-manage/gql/queries/fuel/data-extension-folder';
import listFolderQuery from 'leads-manage/gql/queries/fuel/list-folder';
import groupFolderQuery from 'leads-manage/gql/queries/fuel/group-folder';

export default Component.extend(ComponentQueryManager, {
  errorProcessor: inject(),

  init() {
    this._super(...arguments);
    const selectedIds = this.get('selectedIds');
    if (!Array.isArray(selectedIds)) this.set('selectedIds', []);
    this.set('checkboxOptions', {
      three_state: false,
    });
  },

  mapFolders(SubFolders) {
    return SubFolders.map((sub) => {
      const { ObjectID: id, Name: text, __typename } = sub;
      return {
        id,
        text,
        children: true,
        icon: 'entypo icon-folder',
        li_attr: { __typename },
        state: { disabled: true },
      };
    });
  },

  mapItems(Values) {
    return Values.map((val) => {
      const { ObjectID: id, Name: text, __typename } = val;
      const selected = this.get('selectedIds').includes(id);
      return {
        id,
        text,
        children: false,
        icon: 'entypo icon-dot-single',
        li_attr: { __typename },
        state: { selected },
      };
    });
  },

  async loadRoot(cb) {
    try {
      const results = await this.get('apollo').watchQuery({ query: rootFolders, fetchPolicy: 'cache-and-network' }, 'Fuel_ExclusionDataFolders');
      const nodes = results.map((r) => {
        const { ObjectID: id, Name: text, __typename } = r;
        return {
          id,
          text,
          children: true,
          icon: 'entypo icon-folder',
          li_attr: { __typename },
          state: { disabled: true },
        };
      });
      cb(nodes);
    } catch (e) {
      this.get('errorProcessor').show(e);
    } finally {
      this.set('areSendFoldersLoading', false);
    }
  },

  async loadChildren(id, type, cb) {
    const input = { ObjectID: id };
    const variables = { input };

    let query;
    let key;
    if (type === 'Fuel_DataFolderDataExtension') {
      query = deFolderQuery;
      key = 'DataExtensions';
    } else if (type === 'Fuel_DataFolderList') {
      query = listFolderQuery;
      key = 'Lists';
    } else if (type === 'Fuel_DataFolderGroup') {
      query = groupFolderQuery;
      key = 'Groups';
    }

    try {
      const result = await this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'cache-and-network' }, type);
      const { SubFolders, [key]: Values } = result;
      const subFolders = this.mapFolders(SubFolders);
      const items = this.mapItems(Values);
      const nodes = subFolders.concat(items);
      cb(nodes);
    } catch (e) {
      this.get('errorProcessor').show(e);
    } finally {
      this.set('areSendFoldersLoading', false);
    }
  },

  actions: {
    async load(obj, cb) {
      const { id } = obj;
      if (id === '#') {
        this.loadRoot(cb);
      } else {
        const { li_attr } = obj;
        const { __typename } = li_attr;
        this.loadChildren(id, __typename, cb);
      }
    },
    select(node, selected) {
      const fn = this.get('on-select');
      if (typeof fn === 'function') return fn(node, selected);
    },
    deselect(node, selected) {
      const fn = this.get('on-deselect');
      if (typeof fn === 'function') return fn(node, selected);
    }
  },
});
