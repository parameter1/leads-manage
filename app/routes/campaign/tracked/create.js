import Route from '@ember/routing/route';


export default Route.extend({
  beforeModel(transition) {
    if (!this.user.get('permissions.campaign.create')) {
     transition.abort();
     this.transitionTo('index');
    }
  },

  model() {
    return {
      maxIdentities: 200,
    };
  },
});
