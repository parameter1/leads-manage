import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { getObservable } from 'ember-apollo-client';

import query from 'leads-manage/gql/queries/campaign/email-identities';

export default Route.extend(FormMixin, RouteQueryManager, {
  queryParams: {
    first: {
      refreshModel: true
    },
    after: {
      refreshModel: true
    },
    sortBy: {
      refreshModel: true
    },
    ascending: {
      refreshModel: true
    },
  },

  model({ first, after, sortBy, ascending }) {
    const controller = this.controllerFor(this.get('routeName'));

    controller.set('campaign', this.modelFor('campaign.edit'));

    const id = this.modelFor('campaign.edit.email').get('id');
    const pagination = { first, after };
    const sort = { field: sortBy, order: ascending ? 1 : -1 };

    const variables = { id, pagination, sort };
    if (!sortBy) delete variables.sort.field;

    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'emailCampaignIdentities')
      .then((result) => {
        controller.set('observable', getObservable(result));
        return result;
      })
      .catch(e => this.get('graphErrors').show(e))
    ;
  },
});
