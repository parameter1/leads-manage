import Route from '@ember/routing/route';
import ListRouteMixin from 'leads-manage/mixins/list-route-mixin';

import query from 'leads-manage/gql/queries/line-item/list';
import search from 'leads-manage/gql/queries/line-item/search';

export default Route.extend(ListRouteMixin, {
  /**
   *
   */
  init() {
    this._super(...arguments);
    this.set('queryParams.customers', { refreshModel: true });
    this.set('queryParams.salesReps', { refreshModel: true });
  },

  /**
   *
   * @param {object} params
   */
  model({ first, sortBy, ascending, phrase, searchType, searchBy, customers, salesReps }) {
    const dashboardStatus = this.get('dashboardStatus');
    const input = {
      ...(dashboardStatus && { dashboardStatus }),
      customerIds: customers.map((customer) => customer.id),
      salesRepIds: salesReps.map((salesRep) => salesRep.id),
    };

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
