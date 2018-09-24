import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import rootFolders from 'leads-manage/gql/queries/fuel/data-extension-folders';
import folderQuery from 'leads-manage/gql/queries/fuel/data-extension-folder';

export default Component.extend(ComponentQueryManager, {
  init() {
    this._super(...arguments);
    this.set('checkboxOptions', {
      three_state: false,
    });
  },

  mapFolders(SubFolders) {
    return SubFolders.map(sub => ({ id: sub.ObjectID, text: sub.Name, children: true, icon: 'entypo icon-folder', state: { disabled: true } }));
  },

  mapExtensions(DataExtensions) {
    return DataExtensions.map(de => ({ id: de.ObjectID, text: de.Name, children: false, icon: 'entypo icon-database' }));
  },

  async loadRoot(cb) {
    try {
      const results = await this.get('apollo').watchQuery({ query: rootFolders, fetchPolicy: 'network-only' }, 'Fuel_DataExtensionDataFolders');
      const nodes = results.map((r) => {
        const { ObjectID, Name, SubFolders, DataExtensions } = r;
        const subFolders = this.mapFolders(SubFolders);
        const extensions = this.mapExtensions(DataExtensions);
        const children = subFolders.concat(extensions);
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
      const result = await this.get('apollo').watchQuery({ query: folderQuery, variables, fetchPolicy: 'network-only' }, 'Fuel_DataFolderDataExtension');
      const { SubFolders, DataExtensions } = result;
      const subFolders = this.mapFolders(SubFolders);
      const extensions = this.mapExtensions(DataExtensions);
      const nodes = subFolders.concat(extensions);
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
