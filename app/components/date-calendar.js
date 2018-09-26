import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  selected: null,
  minDate: null,
  maxDate: null,

  center: moment(),

  canClear: true,

  disableRemove: computed('selected', function() {
    return this.get('selected') ? false : true;
  }),

  init() {
    this._super(...arguments);
    const selected = this.get('selected');
    if (selected) {
      this.set('center', moment(selected));
    }
  },
  actions: {
    setDate(value) {
      const fn = this.get('onchange');
      if (typeof fn === 'function') {
        fn(value);
      } else {
        this.set('selected', value);
      }
    },
    clearDate() {
      this.set('selected', null);
    },
  },
});
