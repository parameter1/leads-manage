import ListController from '../../../abstract-list';

export default ListController.extend({
  init() {
    this._super(...arguments);
    this.set('sortOptions', [
      { key: 'fieldCount', label: 'Quality' },
      { key: 'createdAt', label: 'Created' },
      { key: 'emailAddress', label: 'Email Address' },
      { key: 'givenName', label: 'First Name' },
      { key: 'familyName', label: 'Last Name' },
    ]);
    this.set('first', 50);
    this.set('sortBy', 'fieldCount');
    this.set('ascending', false);
  },
});
