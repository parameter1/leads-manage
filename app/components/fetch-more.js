import Component from '@ember/component';
import { computed } from '@ember/object';
import { assign } from '@ember/polyfills';

export default Component.extend({

  /**
   * The Apollo client query observable.
   * @type {Observable}
   */
  query: null,

  hasNextPage: false,
  endCursor: null,
  resultKey: null,

  isFetching: false,

  nodes: computed('edges.@each.node', function() {
    return this.get('edges').map(edge => edge.node);
  }),

  hasEvent(name) {
    const fn = this.get(name);
    return fn && typeof fn === 'function';
  },

  sendEvent(name, ...args) {
    if (this.hasEvent(name)) this.get(name)(...args, this);
  },

  actions: {
    /**
     * Fetches more results using the observable from the original query.
     * @see https://www.apollographql.com/docs/react/features/pagination.html
     */
    fetchMore() {
      this.set('isFetching', true);
      this.sendEvent('on-fetch-start');
      const observable = this.get('query');
      const endCursor = this.get('endCursor');
      const resultKey = this.get('resultKey');

      const updateQuery = (previous, { fetchMoreResult }) => {
        const { edges, pageInfo, totalCount } = fetchMoreResult[resultKey];
        if (edges.length) {
          return {
            [resultKey]: {
              __typename: previous[resultKey].__typename,
              totalCount,
              edges: [...previous[resultKey].edges, ...edges],
              pageInfo,
            },
          };
        }
        return previous;
      };
      const pagination = assign({}, observable.variables.pagination, { after: endCursor });
      const variables = { pagination };
      observable.fetchMore({ updateQuery, variables }).then((result) => {
        this.sendEvent('on-fetch-success', result);
        return result;
      }).catch((e) => {
        const evt = 'on-fetch-error';
        if (this.hasEvent(evt)) {
          this.sendEvent(evt, e);
        } else {
          throw e;
        }
      }).finally(() => {
        this.set('isFetching', false);
        this.sendEvent('on-fetch-end');
      });
    },
  },
});
