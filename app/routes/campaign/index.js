import Route from '@ember/routing/route';
import ListRouteMixin from 'leads-manage/mixins/list-route-mixin';

import query from 'leads-manage/gql/queries/campaign/list';
import search from 'leads-manage/gql/queries/campaign/search';

export default Route.extend(ListRouteMixin, {
  init() {
    this._super(...arguments);
    this.set('queryParams.customers', { refreshModel: true });
  },

  /**
   *
   * @param {object} params
   */
  model({ first, sortBy, ascending, phrase, searchType, searchBy, customers }) {
    const input = {
      customerIds: customers.map((customer) => customer.id),
    };

    return this.getResults({
      query,
      queryKey: 'allCampaigns',
      queryVars: { input },
    }, {
      search,
      searchKey: 'searchCampaigns',
      searchVars: { input },
    }, { first, sortBy, ascending, phrase, searchType, searchBy });
  },
});
