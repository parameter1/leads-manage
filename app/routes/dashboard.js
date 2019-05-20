import Route from '@ember/routing/route';
import ListRouteMixin from 'leads-manage/mixins/list-route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import query from 'leads-manage/gql/queries/line-item/list';
import search from 'leads-manage/gql/queries/line-item/search';

export default Route.extend(AuthenticatedRouteMixin, ListRouteMixin, {
  /**
   *
   * @param {object} params
   */
  model({ first, sortBy, ascending, phrase, searchType, searchBy }) {
    return this.getResults({
      query,
      queryKey: 'allLineItems',
    }, {
      search,
      searchKey: 'searchLineItems',
    }, { first, sortBy, ascending, phrase, searchType, searchBy });
  },
});
