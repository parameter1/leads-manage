import ListController from '../abstract-list';

export default ListController.extend({
  init() {
    this._super(...arguments);
    this.set('sortOptions', [
      { key: 'updatedAt', label: 'Updated' },
      { key: 'createdAt', label: 'Created' },
      { key: 'emailAddress', label: 'Email' },
      { key: 'givenName', label: 'First Name' },
      { key: 'familyName', label: 'Last Name' },
    ]);
    this.set('sortBy', 'updatedAt');
    this.set('ascending', false);

    this.set('searchFields', [
      { key: 'emailAddress', label: 'Email' },
      { key: 'givenName', label: 'First Name' },
      { key: 'familyName', label: 'Last Name' },
      { key: 'externalSource.identifier', label: 'ExactTarget ID' },
    ]);
    this.set('searchBy', 'emailAddress');
  },
});
