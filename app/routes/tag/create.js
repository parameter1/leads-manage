import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import LoadingMixin from 'leads-manage/mixins/loading-mixin';

import mutation from 'leads-manage/gql/mutations/create-tag';

export default Route.extend(LoadingMixin, RouteQueryManager, {
  model() {
    return {};
  },

  actions: {
    create({ name }) {
      this.showLoading();
      const payload = { name };
      const variables = { input: { payload } };
      return this.get('apollo').mutate({ mutation, variables }, 'createTag')
        .then(response => this.transitionTo('tag.edit', response.id))
        .then(() => this.get('notify').info('Tag created successfully.'))
        .catch(e => this.get('graphErrors').show(e))
        .finally(() => this.hideLoading())
      ;
    },
  },
});
