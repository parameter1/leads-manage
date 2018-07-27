import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'leads-manage/gql/queries/email-deployment/edit/html';

export default Route.extend(RouteQueryManager, {
  async model() {
    const id = this.modelFor('email.deployment.edit').get('id');
    const variables = { input: { id } };
    const response = await this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'emailDeployment');
    this.controllerFor(this.get('routeName')).set('originalHtml', response.ourHtml);
    return response;
  },

  actions: {
    willTransition(transition) {
      const controller = this.controllerFor(this.get('routeName'));
      const html = controller.get('model.ourHtml');
      const original = controller.get('originalHtml');

      if (html !== original) {
        if (!window.confirm('You have unsaved changes to your HTML. Are you sure you want to navigate away?')) {
          transition.abort();
        }
      }
    },
  },
});
