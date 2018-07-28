import ListController from '../../abstract-list';

export default ListController.extend({
  init() {
    this._super(...arguments);
    this.set('sortOptions', [
      { key: 'createdAt', label: 'Created' },
      { key: 'updatedAt', label: 'Updated' },
      { key: 'lastRetrievedAt', label: 'Last Retrieved' },
      { key: 'name', label: 'Name' },
    ]);
    this.set('sortBy', 'createdAt');

    this.set('searchFields', [
      { key: 'name', label: 'Name' },
      { key: 'subject', label: 'Subject' },
    ]);
    this.set('searchBy', 'name');
  },

  actions: {
    create() {
      this.transitionToRoute('email.deployment.create', { queryParams: { clone: null } });
    },
  },
});
