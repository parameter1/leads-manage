import Mixin from '@ember/object/mixin';
import RouteSearchMixin from 'leads-manage/mixins/route-search-mixin';

export default Mixin.create(RouteSearchMixin, {
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
    first: {
      refreshModel: true
    },
    sortBy: {
      refreshModel: true
    },
    ascending: {
      refreshModel: true
    },
  },

  /**
   *
   * @param {object} params
   */
  async getResults({ query, queryKey }, { search, searchKey }, { first, sortBy, ascending, phrase, searchType, searchBy }) {
    const pagination = { first };
    if (phrase) {
      return this.search({
        query: search,
        resultKey: searchKey,
      }, {
        searchBy,
        phrase,
        searchType,
        pagination,
      });
    }

    const sort = { field: sortBy, order: ascending ? 1 : -1 };
    const variables = { pagination, sort };
    if (!sortBy) delete variables.sort.field;

    this.getController().set('resultKey', queryKey);
    try {
      const response = await this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, queryKey);
      this.getController().set('observable', this.getObservable(response));
      return response;
    } catch (e) {
      this.get('graphErrors').show(e);
    }
  },
});
