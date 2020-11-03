import ListController from '../abstract-list';
import { computed } from '@ember/object';

export default ListController.extend({
  activeFilterCount: computed('customers.length', function() {
    let filters = 0;
    if (this.get('customers.length')) filters += 1;
    return filters;
  }),

  hasActiveFilters: computed('activeFilterCount', function() {
    return this.get('activeFilterCount') > 0;
  }),

  filtersOpen: false,
  filtersEnabled: true,

  init() {
    this._super(...arguments);
    this.get('queryParams').pushObject('customers');
    this.set('customers', []);
    this.set('sortOptions', [
      { key: 'createdAt', label: 'Created' },
      { key: 'updatedAt', label: 'Updated' },
      { key: 'fullName', label: 'Name' },
    ]);
    this.set('sortBy', 'updatedAt');

    this.set('searchFields', [
      { key: 'fullName', label: 'Name' },
    ]);
    this.set('searchBy', 'fullName');
  },

  actions: {
    setCustomers(customers) {
      this.set('customers', customers.map((customer) => ({ id: customer.id, name: customer.name })))
    },
    clearFilters() {
      this.set('customers', []);
    },
  },
});
