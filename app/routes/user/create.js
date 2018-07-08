import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';

import mutation from 'leads-manage/gql/mutations/create-user';

export default Route.extend(FormMixin, RouteQueryManager, {
  beforeModel(transition) {
    if (!this.user.get('permissions.user.create')) {
     transition.abort();
     this.transitionTo('index');
    }
  },

  model() {
    return {
      role: 'Restricted',
    };
  },

  actions: {
    create({
      email,
      givenName,
      familyName,
      password,
      confirmPassword,
      role,
    }) {
      this.startRouteAction();
      const payload = {
        email,
        givenName,
        familyName,
        password,
        confirmPassword,
        role,
      };
      const variables = { input: { payload } };
      return this.get('apollo').mutate({ mutation, variables }, 'createUser')
        .then(response => this.transitionTo('user.edit', response.id))
        .then(() => this.get('notify').info('User created successfully.'))
        .catch(e => this.get('graphErrors').show(e))
        .finally(() => this.endRouteAction())
      ;
    },
  },
});
