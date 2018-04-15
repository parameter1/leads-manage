import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed, get } from '@ember/object';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import urlLinkTypeMutation from 'leads-manage/gql/mutations/extracted-url-link-type';

export default Component.extend(ComponentQueryManager, {
  tagName: 'div',
  classNames: ['card', 'mb-3'],

  /**
   * Services.
   */
  notify: inject(),
  urlProcessor: inject(),
  graphErrors: inject(),

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

  // Disabled because, when using brace expansion on `union`, ember throws an error saying it should be used.
  // eslint-disable-next-line ember/use-brace-expansion
  mergedTags: computed.union('model.tags', 'model.host.tags'),
  uniqueTags: computed.uniqBy('mergedTags', 'id'),

  activeCustomer: computed('model.{customer.id,host.customer.id}', function() {
    if (this.get('model.customer.id')) return this.get('model.customer');
    return this.get('model.host.customer');
  }),

  hasAssignments: computed('assignmentCount', function() {
    return this.get('assignmentCount') > 0;
  }),

  assignmentCount: computed('activeCustomer.id', 'mergedTags.length', function() {
    let count = 0;
    if (this.get('activeCustomer.id')) count += 1;
    count += this.get('mergedTags.length');
    return count;
  }),

  mergedParams: computed('model.{urlParams.[],host.urlParams.[]}', function() {
    let params = {};
    const merged = [];
    this.get('model.host.urlParams').forEach(param => params[get(param, 'key')] = param);
    this.get('model.urlParams').forEach(param => params[get(param, 'key')] = param);
    for (var prop in params) {
      if (params.hasOwnProperty(prop)) {
        merged.pushObject(params[prop]);
      }
    }
    return merged;
  }),

  paramsCount: computed('mergedParams.length', function() {
    return this.get('mergedParams.length');
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
        .catch(e => this.set('errorMessage', this.get('graphErrors').handle(e).message))
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
        .then(() => this.get('notify').info('Link type successfully set.'))
        .catch(e => this.get('graphErrors').show(e))
      ;
    },
  },
});
