import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';

import query from 'leads-manage/gql/queries/customer/view';
import deleteCustomer from 'leads-manage/gql/mutations/delete-customer';
import updateCustomer from 'leads-manage/gql/mutations/update-customer';

export default Route.extend(FormMixin, RouteQueryManager, {
  beforeModel(transition) {
    if (!this.user.get('permissions.customer.edit')) {
     transition.abort();
     this.transitionTo('index');
    }
  },

  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'customer');
  },
  actions: {
    update(model) {
      this.startRouteAction();
      const mutation = updateCustomer;
      const { id, name, description, website, parent } = model;
      const payload = { name, description, website, parentId: parent.id };
      const input = { id, payload };
      const variables = { input };
      return this.get('apollo').mutate({ mutation, variables }, 'updateCustomer')
        .then(() => this.get('notify').info('Customer successfully updated.'))
        .catch(e => this.get('graphErrors').show(e))
        .finally(() => this.endRouteAction())
      ;
    },
    delete(id, routeName) {
      this.startRouteAction();
      const mutation = deleteCustomer;
      const variables = { input: { id } };
      return this.get('apollo').mutate({ mutation, variables }, 'deleteCustomer')
        .then(() => this.get('notify').info('Customer successfully deleted.'))
        .then(() => this.transitionTo(routeName))
        .catch(e => this.get('graphErrors').show(e))
        .finally(() => this.endRouteAction())
      ;
    },
  },
});
