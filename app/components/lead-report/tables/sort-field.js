import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'a',

  classNames: ['clickable'],
  attributeBindings: ['href'],

  href: '#',

  key: null,
  sortBy: '',
  ascending: false,

  click(event) {
    event.preventDefault();
    if (this.get('isActive')) {
      this.toggleProperty('ascending');
    } else {
      this.set('sortBy', this.get('key'));
      this.set('ascending', true);
    }
  },

  isActive: computed('key', 'sortBy', function() {
    return this.get('key') === this.get('sortBy');
  }),
});
