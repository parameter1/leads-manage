import AbstractPaginable from '../abstract-paginable';

export default AbstractPaginable.extend({
  init() {
    this._super(...arguments);
    this.set('queryParams', ['first', 'after', 'sortBy', 'ascending']);
    // Sort options are specific to the model in question.
    this.set('sortOptions', [
      { key: 'email', label: 'Email Address' },
      { key: 'updatedAt', label: 'Updated' },
      { key: null, label: 'Created' },
      { key: 'givenName', label: 'First Name' },
      { key: 'familyName', label: 'Last Name' },
    ]);
    this.set('sortBy', 'email');
    this.set('ascending', true);
  },
});
