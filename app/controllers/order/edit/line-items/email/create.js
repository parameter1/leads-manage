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

  isEditorial: computed('model.{tags.@each.name,linkTypes.[]}', function() {
    const pr = this.get('model.tags').find(tag => tag.name === 'PR');
    const editorialLink = this.get('model.linkTypes').includes('Editorial');
    if (pr || editorialLink) return true;
    return false;
  }),

  requiredFieldOptions: computed('identityAttributes.getViewableFields', 'model.requiredFields', function() {
    const selected = this.get('model.requiredFields');
    return this.get('identityAttributes.getViewableFields').filter(o => !selected.includes(o.key));
  }),

  excludedFieldOptions: computed('identityAttributes.getViewableFields', 'model.excludedFields', function() {
    const selected = this.get('model.excludedFields');
    return this.get('identityAttributes.getViewableFields').filter(o => !selected.includes(o.key));
  }),

  /**
   * @todo Implement these to adjust fields when editorial and block phone number.
   */
  // areExcludedFieldsDisabled: computed.reads('isEditorial'),

  // selectedExcludedFieldOptions: computed('identityAttributes.getViewableFields', 'model.excludedFields', 'isEditorial', function() {
  //   const selected = this.get('model.excludedFields');
  //   return this.get('identityAttributes.getViewableFields').filter(o => selected.includes(o.key));
  // }),

  actions: {
    updateIdentityFilters(filters) {
      const formatted = filters.map((filter) => {
        const { key, label, matchType, terms } = filter;
        return {
          key,
          label,
          matchType,
          terms,
        };
      });
      console.log(formatted);
      this.set('model.identityFilters', formatted);
    },
  },
});
