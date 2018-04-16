import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import mutation from 'leads-manage/gql/mutations/create-user';

export default Route.extend(RouteQueryManager, {
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
      ;
    },
  },
});
