import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'leads-manage/gql/queries/customer';
import deleteCustomer from 'leads-manage/gql/mutations/delete-customer';

export default Route.extend(RouteQueryManager, {
  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'no-cache' }, 'customer');
  },
  actions: {
    save() {
      alert('Save!');
    },
    delete(id, routeName) {
      const mutation = deleteCustomer;
      const variables = { input: { id } };
      return this.get('apollo').mutate({ mutation, variables })
        .then(() => this.transitionTo(routeName))
        .catch(e => this.get('graphErrors').show(e))
      ;
    },
  },
});
