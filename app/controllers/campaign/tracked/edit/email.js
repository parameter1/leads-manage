import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

import trackedEmailCampaignStatus from 'leads-manage/gql/mutations/campaign/tracked/email/status';

export default Controller.extend(FormMixin, {
  apollo: inject(),
  actions: {
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
        await this.get('apollo').mutate({ mutation: trackedEmailCampaignStatus, variables }, 'trackedEmailCampaignStatus');
        this.get('notify').info('Campaign status set successfully.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
