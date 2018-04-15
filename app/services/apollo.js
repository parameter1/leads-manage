import ApolloService from 'ember-apollo-client/services/apollo';
import { computed } from '@ember/object';
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

  _runAuthorize() {
    if (!this.get('session.isAuthenticated')) {
      return {};
    }
    return new Promise((resolve) => {
      this.get('session').authorize(
        'authorizer:application',
        (headerName, headerContent) => {
          const headers = {};
          headers[headerName] = headerContent;
          resolve({ headers });
        }
      );
    });
  }

});
