import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  label: null,
  terms: null,
  matchType: null,

  options: computed('terms.[]', function() {
    return this.get('terms').map(term => ({ value: term, label: term }));
  }),

  selected: computed('terms.[]', function() {
    return this.get('options');
  }),

  init() {
    this._super(...arguments);
    this.set('matchOptions', [
      { value: 'contains', label: 'Contains' },
      { value: 'matches', label: 'Exactly Matches' },
      { value: 'starts', label: 'Starts With' },
    ]);
  },

  formatTerm(term) {
    return term.trim().toLowerCase();
  },

  actions: {
    addTerm(term) {
      const formatted = this.formatTerm(term);
      if (formatted) {
        this.get('terms').pushObject(formatted);
      }
    },
    destroy() {
      this.get('on-destroy')(this.get('filter'));
    },
    removeTerm(term) {
      this.get('terms').removeObject(this.formatTerm(term));
    },
  },
});
