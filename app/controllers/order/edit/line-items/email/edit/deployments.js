import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';

export default Controller.extend(FormMixin, {
  apollo: inject(),
  graphErrors: inject(),

  actions: {
    setLinkTypes(types) {
      console.warn('implement setLinkTypes');
      this.set('model.linkTypes', types);
    },

    setTags(tags) {
      console.warn('implement setTags');
      this.set('model.tags', tags);
    },

    setCategories(categories) {
      console.warn('implement setCategories');
      this.set('model.categories', categories)
    },
  },
});
