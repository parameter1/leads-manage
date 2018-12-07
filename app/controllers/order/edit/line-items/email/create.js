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
    console.log(selected, this.get('linkTypes.types'), this.get('linkTypes.types').filter(type => !selected.includes(type)))
    return this.get('linkTypes.types').filter(type => !selected.includes(type));
  }),
});
