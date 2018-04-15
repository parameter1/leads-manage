import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  username: null,
  password: null,
  errorMessage: null,
  session: inject(),

  actions: {
    authenticate() {
      const loader = this.get('loadingDisplay');
      loader.show();
      this.set('errorMessage', null);
      const { username, password } = this.getProperties('username', 'password');
      this.get('session')
        .authenticate('authenticator:application', username, password)
        .catch((error) => this.set('errorMessage', error.errors.length ? error.errors[0].message : 'An unknown error has occurred.'))
        .finally(() => loader.hide())
      ;
    }
  }
});
