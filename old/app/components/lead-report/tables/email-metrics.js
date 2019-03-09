import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  tagName: 'table',
  classNames: ['table', 'table-striped', 'table-sm'],

  title: null,

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
