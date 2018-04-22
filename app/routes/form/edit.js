import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import LoadingMixin from 'leads-manage/mixins/loading-mixin';

import query from 'leads-manage/gql/queries/form';
import deleteForm from 'leads-manage/gql/mutations/delete-form';
import updateForm from 'leads-manage/gql/mutations/update-form';

export default Route.extend(LoadingMixin, RouteQueryManager, {
  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'form');
  },
  actions: {
    update({ id, customer, externalSource }) {
      this.showLoading();
      const mutation = updateForm;
      const customerId = customer ? get(customer, 'id') : undefined;
      const { identifier, namespace } = externalSource;

      const payload = { customerId, externalSource: { identifier, namespace } };
      const variables = { input: { id, payload } };
      return this.get('apollo').mutate({ mutation, variables }, 'updateForm')
        .then(() => this.get('notify').success('Form successfully updated.'))
        .catch(e => this.get('graphErrors').show(e))
        .finally(() => this.hideLoading())
      ;
    },
    delete(id, routeName) {
      this.showLoading();
      const mutation = deleteForm;
      const variables = { input: { id } };
      return this.get('apollo').mutate({ mutation, variables }, 'deleteForm')
        .then(() => this.transitionTo(routeName))
        .catch(e => this.get('graphErrors').show(e))
        .finally(() => this.hideLoading())
      ;
    },
  },
});
