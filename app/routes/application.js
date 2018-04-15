import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

export default Route.extend(ApplicationRouteMixin, RouteQueryManager, {
  session: inject(),

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch((e) => {
      this.get('graphErrors').show(e);
      this.get('session').invalidate();
    });
  },

  setupController(controller, model) {
    controller.set('session', this.get('session'));
    this._super(controller, model);
  },

  _loadCurrentUser() {
    return this.get('user').load();
  },

  actions: {
    /**
     *
     * @param {string} name The route name to transition to.
     */
    transitionTo(name) {
      this.transitionTo(name);
    },
  },
});
