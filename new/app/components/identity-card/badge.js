import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  classNames: ['badge', 'badge-pill'],
  classNameBindings: ['_typeClass'],
  inactive: false,

  _label: computed('inactive', function() {
    return this.get('inactive') ? 'Inactive' : 'Active';
  }),

  _typeClass: computed('inactive', function() {
    return this.get('inactive') ? 'badge-danger' : 'badge-success';
  }),
});
