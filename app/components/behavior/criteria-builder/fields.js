import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['collapse'],
  attributeBindings: ['data-parent', 'aria-labelledby'],
  classNameBindings: ['show'],

  model: null,

  show: computed('model.id', function() {
    if (this.get('model.id')) return false;
    return true;
  }),

  searchType: computed('model.type', function() {
    const type = this.get('model.type');
    if (!type) return null;
    return `behavior-${type.toLowerCase()}`;
  }),

  searchDisabled: computed('searchType', function() {
    if (this.get('searchType')) return false;
    return true;
  }),

  actions: {
    setType(type) {
      this.set('model.type', type);
      this.set('model.items', []);
    },
  },
});
