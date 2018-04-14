import AbstractPaginable from '../abstract-paginable';

export default AbstractPaginable.extend({
  init() {
    this.set('queryParams', ['first', 'after', 'sortBy', 'ascending']);
    // Sort options are specific to the model in question.
    this.set('sortOptions', [
      { key: null, label: 'Created' },
      { key: 'updatedAt', label: 'Updated' },
      { key: 'name', label: 'Name' },
    ]);
    this._super(...arguments);
  },
});
