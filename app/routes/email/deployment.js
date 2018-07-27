import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import searchEmailCategories from 'leads-manage/gql/queries/email-category/search';

export default Route.extend(RouteQueryManager, {
  actions: {
    async searchCategories(phrase) {
      const search = {
        field: 'name',
        phrase,
      };
      const variables = { search };
      try {
        const result = await this.get('apollo').query({ query: searchEmailCategories, variables }, 'searchEmailCategories');
        return result.edges.map(edge => edge.node);
      } catch (e) {
        this.get('graphErrors').show(e);
      }
    },
  },
});

