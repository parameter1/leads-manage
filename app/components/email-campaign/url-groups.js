import Component from '@ember/component';
import ActionMixin from 'leads-manage/mixins/action-mixin';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { schedule } from '@ember/runloop';

import emailCampaignExcludedUrls from 'leads-manage/gql/mutations/campaign/email/excluded-urls';

export default Component.extend(ActionMixin, {
  apollo: inject(),

  shouldSelectAll: false,
  shouldDeselectAll: false,

  urlGroups: computed.reads('model.urlGroups.[]'),

  actions: {
    selectAll() {
      this.set('shouldSelectAll', false);
      this.set('shouldSelectAll', true);
      schedule('afterRender', () => {
        this.send('updateExcludedUrls');
      });
    },

    deselectAll() {
      this.set('shouldDeselectAll', false);
      this.set('shouldDeselectAll', true);
      schedule('afterRender', () => {
        this.send('updateExcludedUrls');
      });
    },

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
