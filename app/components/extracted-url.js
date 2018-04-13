import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import urlLinkTypeMutation from 'leads-manage/gql/mutations/extracted-url-link-type';

export default Component.extend(ComponentQueryManager, {
  tagName: 'div',
  classNames: ['card', 'mb-3'],

  /**
   * Services.
   */
  // loading: service(),
  notify: inject(),
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
        .catch(e => this.set('errorMessage', this.get('errorProcessor').handle(e).message))
        .finally(() => this.set('isLoading', false))
      ;
    },
    toggleSettings() {
      this.set('showSettings', !this.get('showSettings'));
    },
    setLinkType(type) {
      const input = { urlId: this.get('model.id'), type };
      const variables = { input };
      this.get('apollo').mutate({ mutation: urlLinkTypeMutation, variables }, 'extractedUrlLinkType')
        .then(() => this.set('model.linkType', type))
        .then(() => this.get('notify').info('Link type successfully set.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
  },
});
