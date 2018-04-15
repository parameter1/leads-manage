import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import changeCurrentUserPassword from 'leads-manage/gql/mutations/change-current-user-password';
import updateCurrentUserProfile from 'leads-manage/gql/mutations/update-current-user-profile';

export default Component.extend(ComponentQueryManager, {
  session: inject(),

  isChangePasswordOpen: false,
  canChangePassword: computed('reasonForPreventChange', function() {
    return (!this.get('reasonForPreventChange')) ? true : false;
  }),

  reasonForPreventChange: computed('password.{value,confirm}', function() {
    if (!this.get('password.value.length') || this.get('password.value.length') < 6) {
      return 'supply a new password of at least six characers.';
    }
    if (this.get('password.value') === this.get('password.confirm')) {
      return null;
    }
    return 'please confirm your password with the same value.';
  }),

  isUpdateProfileOpen: false,

  didInsertElement() {
    this.set('password', { value: '', confirm: '' });
  },

  actions: {
    logout() {
      const loading = this.get('loadingDisplay');
      loading.show();
      this.get('session').invalidate().finally(() => loading.hide());
    },
    displayChangePassword() {
      this.set('isChangePasswordOpen', true);
    },
    displayUpdateProfile() {
      this.set('isUpdateProfileOpen', true);
    },
    changePassword() {
      const mutation = changeCurrentUserPassword;
      const { value, confirm } = this.get('password');
      const input = { value, confirm };
      const variables = { input };
      return this.get('apollo').mutate({ mutation, variables }, 'changeCurrentUserPassword')
        .then(() => {
          this.set('isChangePasswordOpen', false);
          this.get('notify').success('Password successfully changed.');
        })
        .catch(e => this.get('graphErrors').show(e))
      ;
    },

    clearPassword() {
      this.set('password.value', null);
      this.set('password.confirm', null);
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
