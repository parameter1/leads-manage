import Service, { inject } from '@ember/service';

import extractUrlsFromHtml from 'leads-manage/gql/queries/extract-urls';
import crawlUrl from 'leads-manage/gql/queries/crawl-url';

export default Service.extend({
  /**
   *
   */
  apollo: inject(),

  /**
   *
   * @param {*} url
   * @param {*} cache
   */
  crawl(url, cache = true) {
    const variables = { url, cache };
    const resultKey = 'crawlUrl';
    return this.get('apollo').watchQuery({ query: crawlUrl, variables }, resultKey);
  },

  /**
   * Extracts URLs from the provided HTML.
   *
   * @param {string} html
   * @return {Promise}
   */
  extractFrom(html) {
    const variables = { html };
    const resultKey = 'extractUrlsFromHtml';
    return this.get('apollo').watchQuery({ query: extractUrlsFromHtml, variables }, resultKey);
  },
});
