import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';

import emailCampaignTags from 'leads-manage/gql/mutations/campaign/email/tags';

export default Controller.extend(FormMixin, {
  apollo: inject(),

  areTagsSaving: false,

  actions: {
    async updateTags(tags) {
      this.set('areTagsSaving', true);
      this.startAction();
      const id = this.get('model.id');
      const tagIds = tags.map(tag => tag.id);
      const input = { id, tagIds };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: emailCampaignTags, variables }, 'emailCampaignTags');
        this.get('notify').info('Campaign tags set successfully.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
        this.set('areTagsSaving', false);
      }
    },
    async updateLinkTypes(linkTypes) {
      console.info('updateLinkTypes', linkTypes);
    },
  },
});
