import Route from '@ember/routing/route';
import { getObservable } from 'ember-apollo-client';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'leads-manage/gql/queries/lead-report/email-identities';

export default Route.extend(RouteQueryManager, {
  /**
   *
   * @param {object} params
   */
  model({ first, sortBy, ascending }) {
    const controller = this.controllerFor(this.get('routeName'));

    controller.set('campaign', this.modelFor('campaign.edit'));

    const hash = this.modelFor('lead-report').get('hash');
    const pagination = { first };
    const sort = { field: sortBy, order: ascending ? 1 : -1 };

    const variables = { hash, pagination, sort };
    if (!sortBy) delete variables.sort.field;

    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'reportEmailIdentities')
      .then((result) => {
        controller.set('observable', getObservable(result));
        return result;
      })
      .catch(e => this.get('graphErrors').show(e))
    ;
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('excludeFields', this.modelFor('lead-report').get('email.excludeFields'));
  },
});
