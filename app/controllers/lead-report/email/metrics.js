import ListController from '../../abstract-list';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default ListController.extend({
  init() {
    this._super(...arguments);
    this.set('sortOptions', []);
    this.set('sortBy', 'sentDate');
    this.set('ascending', true);
  },
});
