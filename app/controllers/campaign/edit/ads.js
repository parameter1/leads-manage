import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';

import adCampaignStatus from 'leads-manage/gql/mutations/campaign/ads/status';
import adCampaignTags from 'leads-manage/gql/mutations/campaign/ads/tags';

export default Controller.extend(FormMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {*} tags
     */
    async updateTags(tags) {
      this.startAction();
      const id = this.get('model.id');
      const tagIds = tags.map(tag => tag.id);
      const input = { id, tagIds };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: adCampaignTags, variables }, 'adCampaignTags');
        this.get('notify').info('Campaign tags set successfully.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     */
    async updateStatus(event) {
      this.startAction();
      const { target } = event;
      const { checked } = target;
      const id = this.get('model.id');
      const input = { id, enabled: checked };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: adCampaignStatus, variables }, 'adCampaignStatus');
        this.get('notify').info('Campaign status set successfully.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
