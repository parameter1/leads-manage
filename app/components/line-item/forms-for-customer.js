import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['form-group'],

  // options: computed('linkTypeService.types', 'linkTypes', function() {
  //   const selected = this.get('linkTypes');
  //   return this.get('linkTypeService.types').filter(type => !selected.includes(type));
  // }),

  init() {
    this._super(...arguments);
    this.set('options', []);
  },

  actions: {
    onChange(linkTypes) {
      this.get('onChange')(linkTypes);
    },
  },

});
