import Controller from '@ember/controller';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';
import { inject } from '@ember/service';

import deFolders from 'leads-manage/gql/queries/fuel/data-extension-folders';

export default Controller.extend(ObjectQueryManager, {
  errorProcessor: inject(),

  actions: {
    async loadDataExtensions(obj, cb) {
      console.info('obj', obj)
      try {
        const results = await this.get('apollo').watchQuery({ query: deFolders, fetchPolicy: 'network-only' }, 'Fuel_DataExtensionDataFolders');
        const nodes = results.map(n => ({ ...n, children: true, icon: 'entypo icon-folder' }));
        console.info('nodes', nodes);
        cb(nodes);
      } catch (e) {
        this.get('errorProcessor').show(e);
      } finally {
        this.set('areSendFoldersLoading', false);
      }
    },

    actionReceiver(...args) {
      console.info('actionReceiver', ...args);
    }
  }

});
