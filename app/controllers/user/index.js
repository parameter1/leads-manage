import ListController from '../abstract-list';

export default ListController.extend({
  init() {
    this._super(...arguments);
    this.set('sortOptions', [
      { key: 'email', label: 'Email Address' },
      { key: 'updatedAt', label: 'Updated' },
      { key: 'createdAt', label: 'Created' },
      { key: 'givenName', label: 'First Name' },
      { key: 'familyName', label: 'Last Name' },
    ]);
    this.set('sortBy', 'email');
    this.set('ascending', true);
  },
});
