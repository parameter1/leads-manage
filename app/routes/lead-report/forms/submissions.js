import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { getObservable } from 'ember-apollo-client';

import query from 'leads-manage/gql/queries/lead-report/form-entries';

export default Route.extend(RouteQueryManager, {
  model({ form_id }) {
    const controller = this.controllerFor(this.get('routeName'));

    controller.set('form', this.modelFor('lead-report.forms'));

    const campaign = this.modelFor('lead-report');

    const pagination = { first: 40 };
    const sort = { field: 'identifier', order: 1 };

    const input = {
      formId: form_id,
      suppressInactives: true,
      refresh: true,
      max: campaign.maxIdentities,
    };
    const formInput = { id: form_id };
    const variables = { input, pagination, sort, formInput };

    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' })
      .then((result) => {
        controller.set('observable', getObservable(result));
        return result;
      })
      .catch(e => this.get('graphErrors').show(e))
    ;
  },
});
