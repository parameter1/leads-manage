import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';

import query from 'leads-manage/gql/queries/campaign/email';

export default Route.extend(FormMixin, RouteQueryManager, {
  identityAttributes: inject(),
  linkTypes: inject(),

  model() {
    const id = this.modelFor('campaign.edit').get('email.id');
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'emailCampaign');
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('identityAttributes', this.get('identityAttributes'));
    controller.set('linkTypes', this.get('linkTypes'));
  },
});
