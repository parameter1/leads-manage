import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';

import mutation from 'leads-manage/gql/mutations/create-customer';

export default Route.extend(RouteQueryManager, FormMixin, {
  beforeModel(transition) {
    if (!this.user.get('permissions.customer.create')) {
     transition.abort();
     this.transitionTo('index');
    }
  },

  model() {
    return {};
  },

  actions: {
    create({ name, description, website }) {
      this.startRouteAction();
      const payload = { name, description, website };
      const variables = { input: { payload } };
      return this.get('apollo').mutate({ mutation, variables }, 'createCustomer')
        .then(response => this.transitionTo('customer.edit', response.id))
        .then(() => this.get('notify').info('Customer created successfully.'))
        .catch(e => this.get('graphErrors').show(e))
        .finally(() => this.endRouteAction())
      ;
    },
  },
});
