import AbstractPaginable from '../../abstract-paginable';

export default AbstractPaginable.extend({
  init() {
    this._super(...arguments);
    this.set('queryParams', ['first', 'after', 'sortBy', 'ascending']);
    // Sort options are specific to the model in question.
    this.set('sortOptions', [
      { key: 'externalSource.createdAt', label: 'Created' },
      { key: 'externalSource.updatedAt', label: 'Updated' },
      { key: 'externalSource.lastRetrievedAt', label: 'Last Retrieved' },
      { key: 'name', label: 'Name' },
    ]);
    this.set('sortBy', 'externalSource.createdAt');
  },
});
