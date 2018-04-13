import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed, set } from '@ember/object';

export default Component.extend({
  classNames: ['card'],

   /**
   * Services
   */
  // loading: service(),
  apollo: inject(),
  errorProcessor: inject(),

  /**
   * Public properties
   */
  value: null, // The extracted value, either a full URL or hostname.
  model: null, // The extracted assignment model (either a `extracted-url` or `extracted-host`)

  /**
   * Computed (private) properties
   */
  headerText: computed('scope', function() {
    return 'host' === this.get('scope') ? 'Track by Host' : 'Track by Exact URL';
  }),

  scope: computed('value', function() {
    const value = this.get('value');
    if (!value) {
      return;
    }
    return 0 === value.indexOf('http') ? 'url' : 'host';
  }),

  actions: {
    setCustomer(customer) {
      this.set('model.customer', customer);
      console.info('setCustomer', customer);
      alert('send setCustomer action for URL');
    },
    setTags(tags) {
      this.set('model.tags', tags);
      console.info('setTags', tags);
      alert('send setTags action for URL');
    },
    saveAssignment() {
      alert('saveAssignment');
      // const loading = this.get('loading');
      // loading.show();
      // this.get('extracted').save()
      //   .catch(adapterError => this.get('errorProcessor').notify(adapterError.errors))
      //   .finally(() => loading.hide())
      // ;
    },
  },

});
