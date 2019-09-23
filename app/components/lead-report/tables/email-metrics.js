import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  tagName: 'table',
  classNames: ['table', 'table-striped', 'table-sm'],

  title: null,

  displayDelivered: computed('displayDeliveredMetrics', 'sends.@each.send.isNewsletter', function() {
    if (this.get('displayDeliveredMetrics')) return true;
    const sends = this.get('sends');
    const newsletters = sends.map(({ send }) => send.isNewsletter);
    return !newsletters.every(v => v === true);
  }),

  init() {
    this._super(...arguments);
    this.set('iframe', {
      show: false,
      title: null,
      src: null,
    });
  },

  actions: {
    displayIframeModal(send) {
      this.set('iframe.title', get(send, 'name'));
      this.set('iframe.src', get(send, 'url'));
      this.set('iframe.show', true);
    },
  },
});
