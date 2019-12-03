import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { RouteQueryManager } from 'ember-apollo-client';
import ActionMixin from 'leads-manage/mixins/action-mixin';

import query from 'leads-manage/gql/queries/video/edit';
import videoCustomer from 'leads-manage/gql/mutations/video/customer';

export default Route.extend(RouteQueryManager, ActionMixin, {
  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'video');
  },

  actions: {
    update({ id, customer }) {
      this.startRouteAction();
      const mutation = videoCustomer;
      const customerId = customer ? get(customer, 'id') : undefined;
      const input = { videoId: id, customerId };
      const variables = { input };
      return this.get('apollo').mutate({ mutation, variables }, 'videoCustomer')
        .then(() => this.get('notify').info('Video successfully updated.'))
        .catch(e => this.get('graphErrors').show(e))
        .finally(() => this.endRouteAction())
      ;
    },
  }
});
