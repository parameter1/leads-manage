import Route from '@ember/routing/route';

export default Route.extend({
  model({ hash }) {
    console.info('hash', hash);
  },

  setupController() {
    this._super(...arguments);
    this.controllerFor('application').set('displayNav', false);
  },
});
