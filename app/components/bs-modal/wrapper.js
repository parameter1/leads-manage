import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import $ from 'jquery';

export default Component.extend({
  classNames: ['modal'],
  classNameBindings: ['fade'],
  attributeBindings: ['role'],

  fade: true,
  show: false,
  role: 'dialog',
  size: null,

  isShowing: false,
  isShown: false,
  isHiding: false,
  isHidden: true,

  didInsertElement() {
    const keys = ['backdrop', 'keyboard', 'focus'];
    const options = keys.reduce((opts, key) => {
      const value = this.get(key);
      if (isPresent(value)) opts[key] = value;
      return opts;
    }, { show: false });
    this.$().modal(options);
    this.send('show');
  },

  willDestroyElement() {
    const instance = this.$();
    instance.on('hidden.bs.modal', () => {
      instance.modal('dispose');
    });
    this.send('hide');
  },

  actions: {
    show() {
      if (this.get('isShowing')) {
        return;
      }
      this.set('isShowing', true);
      this.sendAction('onShowing')
      const instance = this.$();
      instance.on('shown.bs.modal', () => {
        this.set('isShowing', false);
        this.set('isShown', true);
        this.sendAction('onShown');
      });

      instance.modal('show');

      // Turn off Bootstrap's native dismissing of the modal (via a click from a`[data-dismiss="modal"]` element or by clicking the backdrop)
      instance.off('click.dismiss.bs.modal');

      // Add a new handler to send the Ember hide() action.
      instance.on('click.dismiss.bs.modal', (event) => {
        if ($(event.currentTarget).is(event.target) && true === this.get('backdrop')) {
          this.send('hide');
        }
      });
    },

    hide() {
      if (this.get('isHiding')) {
        return;
      }

      const instance = this.$();
      if (!this.get('isDestroyed')) {
        this.set('isHiding', true);
      }
      // @todo Add support for preventing close on false;
      instance.on('hidden.bs.modal', () => {
        if (!this.get('isDestroyed')) {
          this.set('isHidden', true);
          this.sendAction('onHidden');
          this.set('show', false);
        }
      });
      instance.modal('hide');
    },
  },

});
