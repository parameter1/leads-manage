import Route from '@ember/routing/route';
import ListRouteMixin from 'leads-manage/mixins/list-route-mixin';

import query from 'leads-manage/gql/queries/line-item/email/edit/leads/active';
import search from 'leads-manage/gql/queries/line-item/email/edit/leads/active-search';

export default Route.extend(ListRouteMixin, {
  queryParams: {
    phrase: {
      refreshModel: true,
      replace: true,
      as: 'identityPhrase',
    },
    searchType: {
      refreshModel: true,
      replace: true,
      as: 'identitySearchType',
    },
    searchBy: {
      refreshModel: true,
      replace: true,
      as: 'identitySearchBy',
    },
    first: {
      refreshModel: true,
      as: 'identityFirst',
    },
    sortBy: {
      refreshModel: true,
      as: 'identitySortBy',
    },
    ascending: {
      refreshModel: true,
      as: 'identityAscending',
    },
  },

  model({
    first,
    sortBy,
    ascending,
    phrase,
    searchType,
    searchBy,
  }) {
    const id = this.modelFor('order.edit.line-items.email.edit');
    const vars = { input: { id } };
    return this.getResults({
      query,
      queryKey: 'emailLineItemActiveIdentities',
      queryVars: vars,
    }, {
      search,
      searchVars: vars,
      searchKey: 'searchEmailLineItemActiveIdentities',
    }, { first, sortBy, ascending, phrase, searchType, searchBy });
  },
});
