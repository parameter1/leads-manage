import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    /**
     *
     * @param {string} name The route name to transition to.
     */
    transitionTo(name) {
      this.transitionTo(name);
    },
  },
});
