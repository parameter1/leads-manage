import Component from '@ember/component';
import { inject } from '@ember/service';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import updateCurrentUserProfile from 'leads-manage/gql/mutations/update-current-user-profile';

export default Component.extend(ComponentQueryManager, {
  session: inject(),

  isUpdateProfileOpen: false,
  isChangePasswordOpen: false,

  actions: {
    displayChangePassword() {
      this.set('isChangePasswordOpen', true);
    },
    logout() {
      const loading = this.get('loadingDisplay');
      loading.show();
      this.get('session').invalidate().finally(() => loading.hide());
    },
    displayUpdateProfile() {
      this.set('isUpdateProfileOpen', true);
    },
    saveProfile() {
      const mutation = updateCurrentUserProfile;
      const { givenName, familyName } = this.get('user.model');
      const input = { givenName, familyName };
      const variables = { input };
      return this.get('apollo').mutate({ mutation, variables }, 'updateCurrentUserProfile')
        .then(() => {
          this.set('isUpdateProfileOpen', false);
          this.get('notify').success('User profile successfully updated.');
        })
        .catch(e => this.get('graphErrors').show(e))
      ;
    },
  },

});
