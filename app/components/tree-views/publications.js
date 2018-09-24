import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import rootFolders from 'leads-manage/gql/queries/fuel/publication-folders';
import folderQuery from 'leads-manage/gql/queries/fuel/publication-folder';

export default Component.extend(ComponentQueryManager, {
  init() {
    this._super(...arguments);
    this.set('checkboxOptions', {
      three_state: false,
      deselect_all: true,
    });
  },

  mapFolders(SubFolders) {
    return SubFolders.map(sub => ({ id: sub.ObjectID, text: sub.Name, children: true, icon: 'entypo icon-folder', state: { disabled: true } }));
  },

  mapPublications(Publications) {
    return Publications.map(pub => ({ id: pub.ID, text: pub.Name, children: false, icon: 'entypo icon-list' }));
  },

  async loadRoot(cb) {
    try {
      const results = await this.get('apollo').watchQuery({ query: rootFolders, fetchPolicy: 'network-only' }, 'Fuel_PublicationDataFolders');
      const nodes = results.map((r) => {
        const { ObjectID, Name, SubFolders, Publications } = r;
        const subFolders = this.mapFolders(SubFolders);
        const pubs = this.mapPublications(Publications);
        const children = subFolders.concat(pubs);
        return {
          id: ObjectID,
          text: Name,
          children,
          icon: 'entypo icon-folder',
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

  async loadChildren(id, cb) {
    const input = { ObjectID: id };
    const variables = { input };
    try {
      const result = await this.get('apollo').watchQuery({ query: folderQuery, variables, fetchPolicy: 'network-only' }, 'Fuel_DataFolderPublication');
      const { SubFolders, Publications } = result;
      const subFolders = this.mapFolders(SubFolders);
      const pubs = this.mapPublications(Publications);
      const nodes = subFolders.concat(pubs);
      cb(nodes);
    } catch (e) {
      this.get('errorProcessor').show(e);
    } finally {
      this.set('areSendFoldersLoading', false);
    }
  },

  actions: {
    async load(obj, cb) {
      if (obj.id === '#') {
        this.loadRoot(cb);
      } else {
        this.loadChildren(obj.id, cb);
      }
    },
    // eventDidCheckNode
    select(node, selected) {
      const fn = this.get('on-select');
      if (typeof fn === 'function') return fn(node, selected);
    },
    // eventDidUncheckNode
    deselect(node, selected) {
      const fn = this.get('on-deselect');
      if (typeof fn === 'function') return fn(node, selected);
    }
  },
});
