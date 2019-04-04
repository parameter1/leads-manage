import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';

import query from 'leads-manage/gql/queries/campaign/hash';

export default Route.extend(RouteQueryManager, {
  model({ hash }) {
    const variables = { hash };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'campaignByHash');
  },
});
