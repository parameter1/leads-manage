import ListController from 'leads-manage/controllers/abstract-list';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default ListController.extend(FormMixin, {
  identityAttributes: inject(),
  isLoading: computed.or('loadingDisplay.isShowing', 'isActionRunning'),

  init() {
    this._super(...arguments);
    const sortOptions = this.get('identityAttributes.getViewableFields').slice();

    this.set('sortOptions', [
      { key: 'fieldCount', label: 'Quality' },
      { key: 'createdAt', label: 'Created' },
    ].concat(sortOptions));
    this.set('first', 50);
    this.set('sortBy', 'fieldCount');
    this.set('ascending', false);

    this.set('searchFields', this.get('identityAttributes.getViewableFields'));
    this.set('searchBy', 'emailAddress');
  },
});
