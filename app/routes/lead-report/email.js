import Route from '@ember/routing/route';
import LoadingMixin from 'leads-manage/mixins/loading-mixin';

export default Route.extend(LoadingMixin, {
  model() {
    return {};
  },

  actions: {
    /**
     *
     * @param {*} transition
     */
    // loading(transition) {
    //   const controller = this.controllerFor(this.get('routeName'));
    //   controller.set('isLoading', true);
    //   transition.finally(() => controller.set('isLoading', false));
    // },
  },
});
