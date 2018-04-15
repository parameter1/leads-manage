import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'leads-manage/gql/queries/tag';
import deleteTag from 'leads-manage/gql/mutations/delete-tag';
import updateTag from 'leads-manage/gql/mutations/update-tag';

export default Route.extend(RouteQueryManager, {
  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'tag');
  },
  actions: {
    update(model) {
      const mutation = updateTag;
      const { id, name } = model;
      const payload = { name };
      const input = { id, payload };
      const variables = { input };
      return this.get('apollo').mutate({ mutation, variables }, 'updateTag')
        .then(() => this.get('notify').success('Tag successfully updated.'))
        .catch(e => this.get('graphErrors').show(e))
      ;
    },
    delete(id, routeName) {
      const mutation = deleteTag;
      const variables = { input: { id } };
      return this.get('apollo').mutate({ mutation, variables }, 'deleteTag')
        .then(() => this.transitionTo(routeName))
        .catch(e => this.get('graphErrors').show(e))
      ;
    },
  },
});
