import Service, { inject } from '@ember/service';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { Promise } from 'rsvp';

import currentUser from 'leads-manage/gql/queries/current-user';

export default Service.extend({
  session: inject(),
  apollo: inject(),
  loadingDisplay: inject(),

  /**
   * The user model from graph.
   *
   * @type {DS.Model}
   */
  model: null,

  /**
   * The user id. Will be `null` if the there is not authenticated user.
   *
   * @type {?string}
   */
  uid: computed.reads('auth.uid'),

  /**
   * The auth object, or `null` if not authenticated.
   *
   * @type {?object}
   */
  auth: computed('isAuthenticated', 'session.currentUser.@each', function() {
    if (!this.get('isAuthenticated')) {
      return;
    }
    return this.get('session.currentUser');
  }),

  /**
   * Determines if the user is authenticated, based on the session.
   * Does not check whether a user model is present, or if the session is verified.
   *
   * @type {boolean}
   */
  isAuthenticated: computed.reads('session.isAuthenticated'),

  load() {
    return new Promise((resolve) => {
      const userId = this.get('session.data.authenticated.id');
      if (isEmpty(userId)) return resolve();

      return this.get('apollo').watchQuery({ query: currentUser }, 'currentUser')
        .then(user => this.set('model', user))
        .then(() => resolve())
      ;
    });
  },

  logout() {
    const loader = this.get('loadingDisplay');
    loader.show();
    return this.get('session').invalidate()
      .finally(loader.hide())
    ;
  }
});
