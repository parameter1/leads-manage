import Mixin from '@ember/object/mixin';
import RouteObservableMixin from 'leads-manage/mixins/route-observable-mixin';

export default Mixin.create(RouteObservableMixin, {
  /**
   *
   * @param {*} queryOptions
   * @param {*} params
   */
  async search({ query, resultKey }, { searchBy, phrase, searchType, pagination }) {
    const typeahead = { field: searchBy, term: phrase };
    const search = { typeahead };
    const options = { position: searchType };
    const variables = { pagination, search, options };

    this.getController().set('resultKey', resultKey);
    try {
      const response = await this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, resultKey);
      this.getController().set('observable', this.getObservable(response));
      return response;
    } catch (e) {
      this.get('graphErrors').show(e)
    }
  },
});
