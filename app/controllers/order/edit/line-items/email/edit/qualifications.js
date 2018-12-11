import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';

export default Controller.extend(FormMixin, {
  apollo: inject(),
  graphErrors: inject(),

  actions: {
    setExcludedFields(fields) {
      console.warn('implement setExcludedFields');
      this.set('model.excludedFields', fields);
    },

    setRequiredFields(fields) {
      console.warn('implement setRequiredFields');
      this.set('model.requiredFields', fields);
    },

    setIdentityFilters(filters) {
      console.warn('implement setIdentityFilters');
      this.set('model.identityFilters', filters);
    },
  },
});
