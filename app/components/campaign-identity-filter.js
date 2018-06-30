import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  identityAttributes: inject(),

  filters: null,

  classNames: ['card'],
  actions: {
    addFilter(field) {
      const { key, label } = field;
      this.get('filters').pushObject({ key, label, matchType: 'matches', terms: [] });
    },
    removeFilter(index) {
      this.get('filters').removeAt(index);
    },
  },
});
