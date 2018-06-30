import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: ['custom-control', 'custom-checkbox'],

  _checked: computed('type', 'selected.[]', function() {
    const found = this.get('selected').find((item) => {
      return item === this.get('type');
    });
    return (found) ? true : false;
  }),

  actions: {
    toggle() {
      const value = this.get('type');
      if (!this.get('_checked')) {
        this.get('selected').pushObject(value);
      } else {
        this.get('selected').removeObject(value);
      }
    },
  },
});
