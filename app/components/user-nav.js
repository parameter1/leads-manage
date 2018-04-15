import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
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
      alert('changePassword');
      // const loading = this.get('loading');
      // loading.show();

      // const options = {
      //   url: '/api/auth/change-password',
      //   data: this.get('password'),
      // };
      // const promise = new Promise(function(resolve, reject) {
      //   $.getJSON(options)
      //     .done(response => resolve(response))
      //     .fail(error => reject(error.responseJSON || {}))
      //   ;
      // });

      // promise
      //   .then(() => {
      //     this.set('isChangePasswordOpen', false);
      //     this.get('notify').success({
      //       closeAfter: 2500,
      //       html: 'Password successfully changed!',
      //     });
      //   })
      //   .catch((json) => this.get('errorProcessor').notify(json.errors || []))
      //   .finally(() => loading.hide())
      // ;
    },
    clearPassword() {
      this.set('password.value', null);
      this.set('password.confirm', null);
    },
    saveProfile() {
      alert('saveProfile');
      // const user = this.userManager.get('user');
      // if (user) {
      //   const loading = this.get('loading');
      //   loading.show();
      //   user.save()
      //     .then(() => {
      //       this.set('isUpdateProfileOpen', false);
      //       this.get('notify').success({
      //         closeAfter: 2500,
      //         html: 'Profile successfully updated!',
      //       });
      //     })
      //     .catch((json) => this.get('errorProcessor').notify(json.errors || []))
      //     .finally(() => loading.hide())
      //   ;
      // }
    },
  },

});
