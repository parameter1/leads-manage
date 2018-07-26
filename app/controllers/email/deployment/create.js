import Controller from '@ember/controller';
import FormMixin from 'leads-manage/mixins/form-mixin';

export default Controller.extend(FormMixin, {
  actions: {
    async create() {
      this.startAction();
      // const payload = { name, description, website };
      // const variables = { input: { payload } };
      // return this.get('apollo').mutate({ mutation, variables }, 'createCustomer')
      //   .then(response => this.transitionTo('customer.edit', response.id))
      //   .then(() => this.get('notify').info('Customer created successfully.'))
      //   .catch(e => this.get('graphErrors').show(e))
      //   .finally(() => this.endRouteAction())
      // ;
    },
  },
});


