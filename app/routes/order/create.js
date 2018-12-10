import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { get } from '@ember/object';

import mutation from 'leads-manage/gql/mutations/order/create';

export default Route.extend(RouteQueryManager, FormMixin, {
  beforeModel(transition) {
    if (!this.user.get('permissions.order.create')) {
     transition.abort();
     this.transitionTo('index');
    }
  },

  model() {
    return {
      range: {},
    };
  },

  actions: {
    async create({ customer, name, salesRep, notes }) {
      this.startRouteAction();
      const customerId = get(customer || {}, 'id');
      const salesRepId = get(salesRep || {}, 'id');

      const input = {
        customerId,
        salesRepId,
        name,
        notes,
      };
      const variables = { input };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createOrder');
        this.get('notify').info('Order created successfully.');
        this.transitionTo('order.edit.line-items', response.id);
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endRouteAction();
      }
    },
  },
});
