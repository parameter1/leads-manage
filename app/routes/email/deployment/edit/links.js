import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'leads-manage/gql/queries/email-deployment/edit/html';

export default Route.extend(RouteQueryManager, {
  model() {
    const id = this.modelFor('email.deployment.edit').get('id');
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'emailDeployment');
  },

  setupController(controller) {
    this._super(...arguments);
    controller.send('process');
  },
});
