import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';

export default Route.extend(FormMixin, RouteQueryManager, {
  model() {
    return this.modelFor('campaign.tracked.edit');
  },

  actions: {
    /**
     *
     * @param {object} params
     */
    async update() {
      // this.startRouteAction();
      // const mutation = updateCampaign;
      // const payload = {
      //   customerId: get(customer || {}, 'id'),
      //   name,
      //   startDate: startDate ? startDate.valueOf() : undefined,
      //   endDate: endDate ? endDate.valueOf() : undefined,
      //   maxIdentities
      // };
      // const input = { id, payload };
      // const variables = { input };
      // try {
      //   await this.get('apollo').mutate({ mutation, variables }, 'updateCampaign');
      //   this.get('notify').info('Campaign successfully updated.');
      // } catch (e) {
      //   this.get('graphErrors').show(e);
      // } finally {
      //   this.endRouteAction();
      // }
    },
  },
});
