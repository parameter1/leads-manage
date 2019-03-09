import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { get } from '@ember/object';

import mutation from 'leads-manage/gql/mutations/campaign/create';

export default Route.extend(RouteQueryManager, FormMixin, {
  beforeModel(transition) {
    if (!this.user.get('permissions.campaign.create')) {
     transition.abort();
     this.transitionTo('index');
    }
  },

  model() {
    return {
      maxIdentities: 200,
    };
  },

  actions: {
    async create({ customer, name, startDate, endDate, maxIdentities }) {
      this.startRouteAction();
      const customerId = get(customer || {}, 'id');

      const input = {
        customerId,
        name,
        startDate: startDate ? startDate.valueOf() : undefined,
        endDate: endDate ? endDate.valueOf() : undefined,
        maxIdentities
      };
      const variables = { input };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createCampaign');
        this.get('notify').info('Campaign created successfully.');
        this.transitionTo('campaign.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endRouteAction();
      }
    },
  },
});
