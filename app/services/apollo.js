import ApolloService from 'ember-apollo-client/services/apollo';
import { computed, get } from '@ember/object';
import { inject } from '@ember/service';
import { setContext } from 'apollo-link-context';
import { Promise } from 'rsvp';

export default ApolloService.extend({
  session: inject(),

  link: computed(function() {
    const httpLink = this._super(...arguments);

    const authLink = setContext((request, context) => {
      return this._runAuthorize(request, context);
    });
    return authLink.concat(httpLink);
  }),

  _runAuthorize(request, context) {
    const headers = {};
    const { ohBehaveToken } = context;
    if (ohBehaveToken) {
      headers['X-Behavior-Token'] = ohBehaveToken;
    }
    if (!this.get('session.isAuthenticated')) {
      return { headers };
    }
    return new Promise((resolve) => {
      const data = this.get('session.data.authenticated.session');
      headers['Authorization'] = `Bearer ${get(data, 'token')}`;
      resolve({ headers })
    });
  }

});
