import Route from '@ember/routing/route';
import FormMixin from 'leads-manage/mixins/form-mixin';


export default Route.extend(FormMixin, {
  model({ line_item_id: id }) {
    return id;
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('order', this.modelFor('order.edit'));
  },
});
