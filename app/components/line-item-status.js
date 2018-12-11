import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  classNameBindings: ['color'],

  status: null,

  color: computed('status', function() {
    switch (this.get('status')) {
      case 'Completed':
        return 'text-primary'
      case 'Active':
        return 'text-success';
      case 'Pending':
        return 'text-info';
      default:
        return 'text-muted';
    }
  }),
});
