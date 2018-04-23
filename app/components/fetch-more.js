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

  nodes: computed('edges.@each.node', function() {
    return this.get('edges').map(edge => edge.node);
  }),

  actions: {
    /**
     * Fetches more results using the observable from the original query.
     * @see https://www.apollographql.com/docs/react/features/pagination.html
     */
    fetchMore() {
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
      observable.fetchMore({ updateQuery, variables })
    },
  },
});
