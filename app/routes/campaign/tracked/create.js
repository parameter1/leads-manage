import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { get } from '@ember/object';

import mutation from 'leads-manage/gql/mutations/tracked-campaign/create';

export default Route.extend(RouteQueryManager, FormMixin, {
  beforeModel(transition) {
    if (!this.user.get('permissions.campaign.create')) {
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
    async create({ customer, name, range, salesRep, notes }) {
      this.startRouteAction();
      const customerId = get(customer || {}, 'id');
      const salesRepId = get(salesRep || {}, 'id');

      const { start, end } = range;

      const input = {
        customerId,
        salesRepId,
        name,
        range: {
          start: start ? start.valueOf() : undefined,
          end: end ? end.valueOf() : undefined,
        },
        notes,
      };
      const variables = { input };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createTrackedCampaign');
        this.get('notify').info('Campaign created successfully.');
        this.transitionTo('campaign.tracked.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endRouteAction();
      }
    },
  },
});
