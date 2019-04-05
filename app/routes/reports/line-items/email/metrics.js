import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';

import query from 'leads-manage/gql/queries/lead-report/email-metrics';

export default Route.extend(RouteQueryManager, {
  queryParams: {
    sortBy: {
      refreshModel: true
    },
    ascending: {
      refreshModel: true
    },
  },

  /**
   *
   * @param {object} params
   */
  model({ sortBy, ascending }) {
    const hash = this.modelFor('reports.line-items').get('hash');

    const sort = { field: sortBy, order: ascending ? 1 : -1 };
    const variables = { hash, sort };

    console.info(variables);
    return {};

    // return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'reportEmailMetrics');
  },
});
