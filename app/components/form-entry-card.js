import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  classNameBindings: ['_getColumnClasses'],

  canEdit: true,
  fullWidth: false,

  _getColumnClasses: computed('fullWidth', function() {
    if (this.get('fullWidth')) {
      return 'col-12';
    }
    return 'col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3';
  }),

  _filteredFields: computed('form.fields.@each.ID', function() {
    return this.get('form.fields').filter((field) => {
      const id = get(field, 'ID') || '';
      return 0 === id.indexOf('Field');
    });
  }),
});
