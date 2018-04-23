import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { getObservable } from 'ember-apollo-client';

import query from 'leads-manage/gql/queries/all-form-entries';

export default Route.extend(RouteQueryManager, {
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
    const controller = this.controllerFor('form.edit.entries');
    const form = this.modelFor('form.edit');
    controller.set('form', form);

    const pagination = { first, after };
    const sort = { field: sortBy, order: ascending ? 1 : -1 };
    const variables = { formId: form.id, pagination, sort };
    if (!sortBy) delete variables.sort.field;
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'allFormEntries')
      .then((result) => {
        controller.set('observable', getObservable(result));
        return result;
      })
      .catch(e => this.get('graphErrors').show(e))
    ;
  },
});
