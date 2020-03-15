import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';

export default Controller.extend(FormMixin, {
  apollo: inject(),
  graphErrors: inject(),

  actions: {
    async create() {

    },

    setDateRange(range) {
      this.set('model.range', range);
    },

    setForm(form) {
      this.set('model.form', form);
    }
  },
});
