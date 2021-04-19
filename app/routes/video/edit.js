import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { RouteQueryManager } from 'ember-apollo-client';
import ActionMixin from 'leads-manage/mixins/action-mixin';

import query from 'leads-manage/gql/queries/video/edit';
import link from 'leads-manage/gql/mutations/video/customer';
import unlink from 'leads-manage/gql/mutations/video/unlink-customer';

export default Route.extend(RouteQueryManager, ActionMixin, {
  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'brightcoveCMSVideo');
  },

  actions: {
    async update({ id, customer }) {
      try {
        this.startRouteAction();
        const customerId = customer ? get(customer, 'id') : undefined;
        const mutation = customerId ? link : unlink;
        const resultKey = customerId ? 'linkBrightcoveVideoToCustomer' : 'unlinkBrightcoveVideoFromCustomers';
        const input = { videoId: id, ...(customerId && { customerId }) };
        const variables = { input };
        await this.get('apollo').mutate({ mutation, variables }, resultKey);
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endRouteAction()
      }
    },
  }
});
