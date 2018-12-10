import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend(FormMixin, {
  apollo: inject(),

  isEditorial: computed('model.{tags.@each.name,linkTypes.[]}', function() {
    const pr = this.get('model.tags').find(tag => tag.name === 'PR');
    const editorialLink = this.get('model.linkTypes').includes('Editorial');
    if (pr || editorialLink) return true;
    return false;
  }),

  actions: {
    async create() {
      this.startAction();
    },

    setDateRange(range) {
      this.set('model.range', range);
    },

    setExcludedFields(fields) {
      this.set('model.excludedFields', fields);
    },

    setRequiredFields(fields) {
      this.set('model.requiredFields', fields);
    },

    setLinkTypes(types) {
      this.set('model.linkTypes', types);
    },

    setTags(tags) {
      this.set('model.tags', tags);
    },

    setEmailCategories(categories) {
      this.set('model.emailCategories', categories)
    },

    setIdentityFilters(filters) {
      const formatted = filters.map((filter) => {
        const { key, label, matchType, terms } = filter;
        return {
          key,
          label,
          matchType,
          terms,
        };
      });
      this.set('model.identityFilters', formatted);
    },
  },
});
