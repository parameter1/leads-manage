import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'leads-manage/gql/queries/email-deployment/edit/html';

export default Route.extend(RouteQueryManager, {
  model() {
    const id = this.modelFor('email.deployment.edit').get('id');
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'emailDeployment');
  },

  setupController(controller, model) {
    controller.set('originalHtml', model.get('ourHtml'));
    this._super(...arguments);
  },

  actions: {
    willTransition(transition) {
      const controller = this.controllerFor(this.get('routeName'));

      if (controller.get('isActionRunning')) {
        transition.abort();
      } else if (controller.get('hasHtmlChanged')) {
        if (!window.confirm('You have unsaved changes to your HTML. Are you sure you want to navigate away?')) {
          transition.abort();
        }
      }
    },
  },
});
