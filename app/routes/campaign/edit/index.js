import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';
import { inject } from '@ember/service';

export default Route.extend(FormMixin, RouteQueryManager, {
  identityAttributes: inject(),
  linkTypes: inject(),

  model() {
    return {
      tags: [],
      excludeFields: ['phoneNumber'],
      allowedLinkTypes: ['Advertising', '(Not Set)'],
    };
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('identityAttributes', this.get('identityAttributes'));
    controller.set('linkTypes', this.get('linkTypes'));
  },
});
