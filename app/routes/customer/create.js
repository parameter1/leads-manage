import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import FormMixin from 'leads-manage/mixins/form-mixin';

import mutation from 'leads-manage/gql/mutations/create-customer';

export default Route.extend(RouteQueryManager, FormMixin, {
  model() {
    return {};
  },

  actions: {
    async create({ name, description, website }) {
      this.startRouteAction();
      const payload = { name, description, website };
      const variables = { input: { payload } };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createCustomer');
        await this.transitionTo('customer.edit', response.id);
        this.get('notify').info('Customer created successfully.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endRouteAction();
      }
    },
  },
});
