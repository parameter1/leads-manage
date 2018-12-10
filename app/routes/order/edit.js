import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';

import query from 'leads-manage/gql/queries/order/view';

export default Route.extend(FormMixin, RouteQueryManager, {
  beforeModel(transition) {
    if (!this.user.get('permissions.order.edit')) {
     transition.abort();
     this.transitionTo('index');
    }
  },

  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'order');
  },
});
