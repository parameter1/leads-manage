import Controller from '@ember/controller';
import ActionMixin from 'leads-manage/mixins/action-mixin';
import { inject } from '@ember/service';

import adMetricsExcludedGAMLineItemIds from 'leads-manage/gql/mutations/campaign/ad-metrics/excluded-gam-line-item-ids';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    async toggleExcludedGAMLineItem(lineItem, isExcluded) {
      try {
        this.startAction();

        const toggled = !isExcluded;
        let excludedIds = this.get('model.adMetrics.excludedGAMLineItemIds').slice();
        if (toggled) {
          excludedIds.push(lineItem.id)
        } else {
          excludedIds = excludedIds.filter((id) => id !== lineItem.id);
        }
        const variables = { input: { id: this.get('model.id'), excludedIds } };
        await this.get('apollo').mutate({ mutation: adMetricsExcludedGAMLineItemIds, variables }, 'campaign');
        this.get('notify').info('Line items set successfully.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
    updateStatus() {
      console.log('update status!');
    }
  },
});
