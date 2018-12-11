import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';

export default Controller.extend(FormMixin, {
  apollo: inject(),
  graphErrors: inject(),

  actions: {
    setDateRange(range) {
      console.warn('implement setDateRange');
      this.set('model.range', range);
    },
  },
});
