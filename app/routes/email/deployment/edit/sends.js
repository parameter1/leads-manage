import Route from '@ember/routing/route';
import ListRouteMixin from 'leads-manage/mixins/list-route-mixin';

import query from 'leads-manage/gql/queries/email-deployment/edit/sends';

export default Route.extend(ListRouteMixin, {
  /**
   *
   * @param {object} params
   */
  model({ first, sortBy, ascending }) {
    const id = this.modelFor('email.deployment.edit').get('id');
    const applyToField = 'sends';
    return this.getResults({
      query,
      queryKey: 'emailDeployment',
      queryVars: { input: { id } },
    }, {}, { first, sortBy, ascending, applyToField });
  },
});
