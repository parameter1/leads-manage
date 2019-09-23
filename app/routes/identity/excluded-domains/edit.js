import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import FormMixin from 'leads-manage/mixins/form-mixin';

import query from 'leads-manage/gql/queries/excluded-email-domain/edit';

export default Route.extend(FormMixin, RouteQueryManager, {
  model({ excluded_domain_id: id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'excludedEmailDomain');
  },
});
