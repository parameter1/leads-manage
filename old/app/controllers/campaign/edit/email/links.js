import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

import emailCampaignExcludedUrls from 'leads-manage/gql/mutations/campaign/email/excluded-urls';

export default Controller.extend(FormMixin, {
  apollo: inject(),

  urlGroups: computed.reads('model.urlGroups.[]'),

  actions: {
    async updateExcludedUrls() {
      this.startAction();

      const id = this.get('model.id');
      const excludeUrls = [];

      this.get('urlGroups').forEach((urlGroup) => {
        const urlId = urlGroup.url.id;
        urlGroup.deploymentGroups.forEach((depGroup) => {
          depGroup.sendGroups.forEach((sendGroup) => {
            excludeUrls.push({
              urlId,
              sendId: sendGroup.send.id,
              active: sendGroup.active,
            })
          });
        });
      });
      const input = { id, excludeUrls };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: emailCampaignExcludedUrls, variables }, 'emailCampaignExcludedUrls');
        this.get('notify').info('Campaign email links successfully excluded.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
