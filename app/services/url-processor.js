import Service, { inject } from '@ember/service';

import query from 'leads-manage/gql/queries/extract-urls';

export default Service.extend({
  /**
   *
   */
  apollo: inject(),

  /**
   * Extracts URLs from the provided HTML.
   *
   * @param {string} html
   * @return {Promise}
   */
  extractFrom(html) {
    const variables = { html };
    const resultKey = 'extractUrlsFromHtml';
    return this.get('apollo').watchQuery({ query, variables }, resultKey);
  },
});
