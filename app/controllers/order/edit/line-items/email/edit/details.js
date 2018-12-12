import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';

import dateRangeMutation from 'leads-manage/gql/mutations/line-item/email/date-range';

export default Controller.extend(FormMixin, {
  apollo: inject(),

  actions: {
    async setDateRange(range) {
      const { start, end } = range;
      if (!end) {
        this.set('model.range', range);
      } else {
        this.startAction();
        const id = this.get('model.id');
        const input = {
          id,
          range: {
            start: start.valueOf(),
            end: end.valueOf(),
          },
        };
        const variables = { input };
        try {
          await this.get('apollo').mutate({ mutation: dateRangeMutation, variables }, 'emailLineItemDateRange');
          this.get('notify').info('Date range saved.');
        } catch (e) {
          this.get('graphErrors').show(e);
        } finally {
          this.endAction();
        }
      }
    },
  },
});
