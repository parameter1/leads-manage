import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.modelFor('order.edit.line-items.email.edit');
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('order', this.modelFor('order.edit'));
  },
});
