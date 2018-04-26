import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import LoadingMixin from 'leads-manage/mixins/loading-mixin';

export default Route.extend(LoadingMixin, ApplicationRouteMixin, RouteQueryManager, {
  session: inject(),

  setupController(controller, model) {
    controller.set('session', this.get('session'));
    this._super(controller, model);
  },

  actions: {
    showLoading() {
      this.showLoading();
    },

    hideLoading() {
      this.hideLoading();
    },

    /**
     *
     * @param {string} name The route name to transition to.
     */
    transitionTo(name) {
      this.transitionTo(name);
    },

    /**
     *
     * @param {*} transition
     */
    loading(transition) {
      this.showLoading();
      transition.finally(() => this.hideLoading());
    },

    /**
     *
     * @param {Error} e
     */
    error(e) {
      if (this.get('graphErrors').isReady()) {
        this.get('graphErrors').show(e);
      } else {
        this.intermediateTransitionTo('application_error', e);
      }
    },
  },
});
