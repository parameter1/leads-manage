import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import LoadingMixin from 'leads-manage/mixins/loading-mixin';

import query from 'leads-manage/gql/queries/email-send';
import mutation from 'leads-manage/gql/mutations/refresh-email-send';

export default Route.extend(RouteQueryManager, LoadingMixin, {
  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'emailSend');
  },

  actions: {
    refresh(id) {
      this.showLoading();
      const controller = this.controllerFor('email.send.view');
      controller.set('isRefreshing', true);

      const variables = { input: { id } };
      return this.get('apollo').mutate({ mutation, variables }, 'refreshEmailSend')
        .catch(e => this.get('graphErrors').show(e))
        .finally(() => {
          controller.set('isRefreshing', false);
          this.hideLoading();
        })
      ;
    },
  },
});
