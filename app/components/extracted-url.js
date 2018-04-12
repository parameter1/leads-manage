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
  // errorProcessor: service('error-processor'),

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
        // .catch((json) => {
        //     let errors = isArray(json.errors) ? json.errors : [];
        //     this.set('errorMessage', this.get('errorProcessor').extractErrorMessage(errors[0]));
        //   })
        .finally(() => this.set('isLoading', false))

      // this.get('urlProcessor').crawl(this.get('url'), disableCache)
      //   .then((extracted) => this.set('_extracted', extracted))
      //   .catch((json) => {
      //     let errors = isArray(json.errors) ? json.errors : [];
      //     this.set('errorMessage', this.get('errorProcessor').extractErrorMessage(errors[0]));
      //   })
      //   .finally(() => this.set('isLoading', false))
      // ;
    },
    toggleSettings() {
      this.set('showSettings', !this.get('showSettings'));
    },
    save() {
      // const loading = this.get('loading');
      // loading.show();
      // this.get('_extracted').save()
      //   .catch(adapterError => this.get('errorProcessor').notify(adapterError.errors))
      //   .finally(() => loading.hide())
      // ;
    },
  },
});
