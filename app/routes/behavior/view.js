import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';
import config from 'leads-manage/config/environment';

export default Route.extend(RouteQueryManager, FormMixin, {
  ohBehaveToken: inject(),
});
