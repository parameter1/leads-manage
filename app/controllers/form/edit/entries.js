import ListController from '../../abstract-list';

export default ListController.extend({
  init() {
    this._super(...arguments);
    this.set('sortOptions', [
      { key: 'identifier', label: 'Form ID' },
    ]);
    this.set('sortBy', 'identifier');
    this.set('ascending', true);
  },
});
