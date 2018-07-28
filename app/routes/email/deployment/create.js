import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'leads-manage/gql/queries/email-deployment/edit';

export default Route.extend(RouteQueryManager, {
  queryParams: {
    clone: {
      refreshModel: true
    }
  },

  async model({ clone }) {
    if (clone) {
      const variables = { input: { id: clone } };
      const deployment = await this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'emailDeployment');
      const name = deployment.name;
      deployment.set('name', `${name} Copy`);
      return deployment;
    }
    return {};
  },
});
