import Route from '@ember/routing/route';
import ListRouteMixin from 'leads-manage/mixins/list-route-mixin';

import query from 'leads-manage/gql/queries/line-item/list';
import search from 'leads-manage/gql/queries/line-item/search';

export default Route.extend(ListRouteMixin, {
  /**
   *
   * @param {object} params
   */
  model({ first, sortBy, ascending, phrase, searchType, searchBy }) {
    const input = { dashboardStatus: 'completed' };
    return this.getResults({
      query,
      queryKey: 'allLineItems',
      queryVars: { input },
    }, {
      search,
      searchKey: 'searchLineItems',
      searchVars: { input },
    }, { first, sortBy, ascending, phrase, searchType, searchBy });
  },
});
