import Service, { inject } from '@ember/service';

import checkSession from 'leads-manage/gql/queries/check-session';
import deleteSession from 'leads-manage/gql/mutations/delete-session';
import loginUser from 'leads-manage/gql/mutations/login-user';

export default Service.extend({
  apollo: inject(),

  /**
   * Checks the current session.
   *
   * @param {string} token
   * @return {Promise}
   */
  check(token) {
    const variables = {
      input: { token },
    };
    return this.get('apollo')
      .watchQuery({ query: checkSession, variables }, "checkSession")
      .then(auth => auth.session)
    ;
  },

  /**
   * Creates a new user (sign-up/registration)
   * Will not immediately log the new user in.
   *
   * @param {Object} payload
   * @param {string} captcha
   * @return {Promise}
   */
  // create(payload, captcha) {
  //   const variables = {
  //     input: { payload, captcha },
  //   };
  //   return this.get('apollo').mutate({ mutation: createUser, variables }, "createUser");
  // },

  /**
   * Submits authentication credentials (logs a user in).
   *
   * @param {string} email
   * @param {string} password
   * @return {Promise}
   */
  submit(email, password) {
    const variables = {
      input: { email, password },
    };
    return this.get('apollo')
      .mutate({ mutation: loginUser, variables }, "loginUser")
      .then(auth => {
        console.info('submit then')
        return auth.session
      })
    ;
  },

  /**
   * Deletes the current auth session token.
   *
   * @return {Promise}
   */
  delete() {
    return this.get('apollo').mutate({ mutation: deleteSession }, "deleteSession");
  },
});
