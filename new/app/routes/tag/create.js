import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import FormMixin from 'leads-manage/mixins/form-mixin';

import mutation from 'leads-manage/gql/mutations/create-tag';

export default Route.extend(FormMixin, RouteQueryManager, {
  beforeModel(transition) {
    if (!this.user.get('permissions.tag.create')) {
     transition.abort();
     this.transitionTo('index');
    }
  },

  model() {
    return {};
  },

  actions: {
    create({ name }) {
      this.startRouteAction();
      const payload = { name };
      const variables = { input: { payload } };
      return this.get('apollo').mutate({ mutation, variables }, 'createTag')
        .then(response => this.transitionTo('tag.edit', response.id))
        .then(() => this.get('notify').info('Tag created successfully.'))
        .catch(e => this.get('graphErrors').show(e))
        .finally(() => this.endRouteAction())
      ;
    },
  },
});
