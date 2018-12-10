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

  // emailSchema.method('getExcludeFields', async function getEmailExcludeFields() {
  //   const isEditorial = this.get('allowedLinkTypes').includes('Editorial');
  //   const tag = await connection.model('tag').findOne({ _id: { $in: this.tagIds }, name: 'PR' });
  //   if (!tag && !isEditorial) return this.get('excludeFields');
  //   return identityAttributes.filter(attr => !['title', 'companyName'].includes(attr.key)).map(attr => attr.key);
  // });

  requiredFieldOptions: computed('identityAttributes.getViewableFields', 'model.requiredFields.[]', function() {
    const selected = this.get('model.requiredFields');
    return this.get('identityAttributes.getViewableFields').filter(o => !selected.includes(o.key));
  }),

  selectedRequiredFields: computed('identityAttributes.getViewableFields', 'model.requiredFields.[]', function() {
    const selected = this.get('model.requiredFields');
    return this.get('identityAttributes.getViewableFields').filter(o => selected.includes(o.key) || o.key === 'emailAddress');
  }),

  excludedFieldOptions: computed('identityAttributes.getViewableFields', 'model.excludedFields.[]', function() {
    const selected = this.get('model.excludedFields');
    return this.get('identityAttributes.getViewableFields').filter(o => !selected.includes(o.key));
  }),

  /**
   * @todo Implement these to adjust fields when editorial and block phone number.
   */
  // areExcludedFieldsDisabled: computed.reads('isEditorial'),

  selectedExcludedFieldOptions: computed('identityAttributes.getViewableFields', 'model.excludedFields.[]', 'isEditorial', function() {
    const selected = this.get('model.excludedFields');
    console.log('selected', selected);
    console.log('isEditorial', this.get('isEditorial'));
    if (this.get('isEditorial')) {
      console.log('identityAttributes.getViewableFields');
      return this.get('identityAttributes.getViewableFields').filter(o => !['title', 'companyName'].includes(o.key) || selected.includes(o.key));
    }
    return this.get('identityAttributes.getViewableFields').filter(o => selected.includes(o.key));
  }),

  actions: {
    setExcludedFields(fields) {
      this.set('model.excludedFields', fields.map(o => o.key));
    },

    setRequiredFields(fields) {
      this.set('model.requiredFields', fields.map(o => o.key));
    },

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
