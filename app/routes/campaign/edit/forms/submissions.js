import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { getObservable } from 'ember-apollo-client';

import query from 'leads-manage/gql/queries/campaign/form';

export default Route.extend(FormMixin, RouteQueryManager, {
  model({ form_id }) {
    const controller = this.controllerFor(this.get('routeName'));

    const input = { id: form_id };
    const pagination = { first: 40 };
    const variables = { input, pagination };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'form')
      .then((result) => {
        controller.set('observable', getObservable(result));
        return result;
      })
      .catch(e => this.get('graphErrors').show(e))
    ;
  },
});
