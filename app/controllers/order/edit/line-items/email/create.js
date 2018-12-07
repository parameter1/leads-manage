import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend(FormMixin, {
  apollo: inject(),
  identityAttributes: inject(),
  linkTypes: inject(),

  linkTypeOptions: computed('linkTypes.types', 'model.linkTypes', function() {
    const selected = this.get('model.linkTypes');
    return this.get('linkTypes.types').filter(type => !selected.includes(type));
  }),

  requiredFieldOptions: computed('identityAttributes.getViewableFields', 'model.requiredFields', function() {
    const selected = this.get('model.requiredFields');
    return this.get('identityAttributes.getViewableFields').filter(o => !selected.includes(o.key));
  }),
});
