import Route from '@ember/routing/route';
import ListRouteMixin from 'leads-manage/mixins/list-route-mixin';

import query from 'leads-manage/gql/queries/video/index';
import search from 'leads-manage/gql/queries/video/search';

export default Route.extend(ListRouteMixin, {
  /**
   *
   * @param {object} params
   */
  model({ first, sortBy, ascending, phrase, searchType, searchBy }) {
    return this.getResults({
      query,
      queryKey: 'allVideos',
    }, {
      search,
      searchKey: 'searchVideos',
    }, { first, sortBy, ascending, phrase, searchType, searchBy });
  },
});
