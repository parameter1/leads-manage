import Controller from '@ember/controller';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';
import { inject } from '@ember/service';

import sendFolderQuery from 'leads-manage/gql/queries/fuel/send-folders';

export default Controller.extend(ObjectQueryManager, {
  errorProcessor: inject(),

  areSendFoldersLoading: false,

  init() {
    this._super(...arguments);
    this.loadSendFolders();
  },

  async loadSendFolders() {
    this.set('areSendFoldersLoading', true);
    try {
      const sendFolders = await this.get('apollo').watchQuery({ query: sendFolderQuery, fetchPolicy: 'network-only' });
      console.info(sendFolders);
      this.set('sendFolders', sendFolders);
    } catch (e) {
      this.get('errorProcessor').show(e);
    } finally {
      this.set('areSendFoldersLoading', false);
    }
  },

});
