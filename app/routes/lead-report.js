import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'leads-manage/gql/queries/campaign/hash';

export default Route.extend(RouteQueryManager, {
  model({ hash }) {
    const variables = { hash };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'campaignByHash');
  },

  afterModel(model) {
    if (model.get('email.enabled')) return;
    if (model.get('forms.enabled')) return this.transitionTo('lead-report.forms');
    if (model.get('ads.enabled')) return this.transitionTo('lead-report.ads');
    return this.transitionTo('lead-report.disabled');
  },

  setupController() {
    this._super(...arguments);
    this.controllerFor('application').set('displayNav', false);
  },

  actions: {
    /**
     *
     * @param {*} transition
     */
    loading(transition) {
      const controller = this.controllerFor(this.get('routeName'));
      transition.finally(() => controller.set('isLoading', false));
      return true;
    },

    willTransition(transition) {
      const { targetName } = transition;
      if (targetName.indexOf('lead-report') !== 0) {
        this.controllerFor('application').set('displayNav', true);
      }
    },
  },
});
