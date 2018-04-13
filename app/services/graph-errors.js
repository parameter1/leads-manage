import Service, { inject } from '@ember/service';

export default Service.extend({
  notify: inject(),

  handle(e) {
    if (e.networkError) {
      return this.handleNetworkError(e.networkError);
    }
    if (e.graphQLErrors) {
      return new Error('Handling of graphQLError objects is not yet implemented.');
    }
    if (e.message) {
      return e;
    }
    return new Error('An unknown, fatal error occurred.');
  },

  handleNetworkError(networkError) {
    const { response, result } = networkError;
    const message = result.errors && Array.isArray(result.errors) ? result.errors[0].message : 'Unknown fatal.';
    return new Error(`Network Error: ${response.statusText} (${response.status}): ${message}`);
  },

  show(e) {
    const error = this.handle(e);
    this.get('notify').error(error.message);
  }
});
