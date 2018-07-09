import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { getObservable } from 'ember-apollo-client';

import query from 'leads-manage/gql/queries/all-customers';
import searchCustomers from 'leads-manage/gql/queries/search-customers';

export default Route.extend(RouteQueryManager, {
  queryParams: {
    phrase: {
      refreshModel: true
    },
    searchType: {
      refreshModel: true
    },
    searchBy: {
      refreshModel: true
    },
    sortBy: {
      refreshModel: true
    },
    ascending: {
      refreshModel: true
    },
  },

  beforeModel(transition) {
    if (!this.user.get('permissions.customer.list')) {
     transition.abort();
     this.transitionTo('index');
    }
  },

  search(field, term, position, pagination) {
    const controller = this.controllerFor(this.get('routeName'));

    const search = { typeahead: { field, term } };
    const options = { position };
    const variables = { pagination, search, options };

    const resultKey = 'searchCustomers';
    controller.set('resultKey', resultKey);

    return this.get('apollo').watchQuery({ query: searchCustomers, variables, fetchPolicy: 'network-only' }, resultKey)
      .then((result) => {
        controller.set('observable', getObservable(result));
        return result;
      })
      .catch(e => this.get('graphErrors').show(e))
  },

  model({ first, after, sortBy, ascending, phrase, searchType, searchBy }) {
    const controller = this.controllerFor(this.get('routeName'));

    const pagination = { first, after };

    if (phrase) {
      return this.search(searchBy, phrase, searchType, pagination);
    }

    const sort = { field: sortBy, order: ascending ? 1 : -1 };
    const variables = { pagination, sort };
    if (!sortBy) delete variables.sort.field;

    const resultKey = 'allCustomers';
    controller.set('resultKey', resultKey);

    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, resultKey)
      .then((result) => {
        controller.set('observable', getObservable(result));
        return result;
      })
      .catch(e => this.get('graphErrors').show(e))
    ;
  },
});
