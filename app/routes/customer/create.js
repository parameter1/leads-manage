import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import LoadingMixin from 'leads-manage/mixins/loading-mixin';

import mutation from 'leads-manage/gql/mutations/create-customer';

export default Route.extend(RouteQueryManager, LoadingMixin, {
  model() {
    return {};
  },

  actions: {
    create({ name, description, website }) {
      this.showLoading();
      const payload = { name, description, website };
      const variables = { input: { payload } };
      return this.get('apollo').mutate({ mutation, variables }, 'createCustomer')
        .then(response => this.transitionTo('customer.edit', response.id))
        .then(() => this.get('notify').info('Customer created successfully.'))
        .catch(e => this.get('graphErrors').show(e))
        .finally(() => this.hideLoading());
      ;
    },
  },
});
