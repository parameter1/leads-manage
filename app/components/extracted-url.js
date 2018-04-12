import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: ['card', 'mb-3'],

  /**
   * Services.
   */
  // loading: service(),
  urlProcessor: inject(),
  errorProcessor: inject(),

  /**
   * Public properties.
   */
  url: null,

  /**
   * Private properties.
   */
  isLoading: true,
  errorMessage: null,
  showSettings: false,

  /**
   * Computed properties.
   */
  didError: computed('errorMessage.length', function() {
    return this.get('errorMessage.length') ? true : false;
  }),

  init() {
    this._super(...arguments);
    this.set('model', {});
    this.send('crawl');
  },

  actions: {
    crawl(cache = true) {
      this.set('isLoading', true);
      this.get('urlProcessor').crawl(this.get('url'), cache)
        .then(extractedUrl => this.set('model', extractedUrl))
        .catch(e => this.get('errorProcessor').show(e))
        .finally(() => this.set('isLoading', false))
      ;
    },
    toggleSettings() {
      this.set('showSettings', !this.get('showSettings'));
    },
    save() {
      // const loading = this.get('loading');
      // loading.show();
      // this.get('_extracted').save()
      //   .catch(e => this.get('errorProcessor').show(e))
      //   .finally(() => loading.hide())
      // ;
    },
  },
});
