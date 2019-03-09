import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import { get } from '@ember/object';
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
    async update(model) {
      this.startRouteAction();
      const mutation = updateCustomer;
      const { id, name, description, website, parent } = model;
      const payload = { name, description, website, parentId: get(parent || {}, 'id') || null };
      const input = { id, payload };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'updateCustomer');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endRouteAction();
      }
    },

    async delete(id, routeName) {
      this.startRouteAction();
      const mutation = deleteCustomer;
      const variables = { input: { id } };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'deleteCustomer');
        await this.transitionTo(routeName);
        this.get('notify').info('Customer successfully deleted.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endRouteAction();
      }
    },
  },
});
