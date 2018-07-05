import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'leads-manage/gql/queries/lead-report/email-metrics';

export default Route.extend(RouteQueryManager, {
  /**
   *
   * @param {object} params
   */
  model() {
    const hash = this.modelFor('lead-report').get('hash');
    const variables = { hash };

    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'reportEmailMetrics');
  },
});
