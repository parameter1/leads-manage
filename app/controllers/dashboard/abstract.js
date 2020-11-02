import ListController from 'leads-manage/controllers/abstract-list';
import { computed } from '@ember/object';

export default ListController.extend({
  activeFilterCount: computed('customers.length', 'salesReps.length', function() {
    let filters = 0;
    if (this.get('customers.length')) filters += 1;
    if (this.get('salesReps.length')) filters += 1;
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
    this.get('queryParams').pushObject('salesReps');

    this.set('customers', []);
    this.set('salesReps', []);

    this.set('sortOptions', [
      { key: 'createdAt', label: 'Created' },
      { key: 'updatedAt', label: 'Updated' },
      { key: 'name', label: 'Name' },
    ]);
    this.set('sortBy', 'updatedAt');

    this.set('searchFields', [
      { key: 'name', label: 'Name' },
    ]);
    this.set('searchBy', 'name');
  },

  actions: {
    setCustomers(customers) {
      this.set('customers', customers.map((customer) => ({ id: customer.id, name: customer.name })))
    },
    setSalesReps(salesReps) {
      this.set('salesReps', salesReps.map((user) => ({ id: user.id, givenName: user.givenName, familyName: user.familyName })))
    },
    clearFilters() {
      this.set('customers', []);
    },
  },
});
