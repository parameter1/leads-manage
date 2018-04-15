import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  classNames: ['btn'],
  attributeBindings: ['disabled', 'type'],

  disabled: false,
  type: 'button',

  hasConfirmed: false,

  click() {
    if (this.get('hasConfirmed')) {
      this.sendAction('onConfirm');
    } else {
      this.set('hasConfirmed', true);
    }
  },

  focusOut() {
    this.set('hasConfirmed', false);
  },
});
