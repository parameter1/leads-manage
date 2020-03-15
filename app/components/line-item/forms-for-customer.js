import Component from '@ember/component';
import { inject } from '@ember/service';

import query from 'leads-manage/gql/queries/form/for-customer';

export default Component.extend({
  apollo: inject(),
  graphErrors: inject(),

  classNames: ['form-group'],

  customerId: null, // required;

  init() {
    this._super(...arguments);
    const variables = { customerId: this.get('customerId') };
    const promise = this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'allForms').then(({ edges }) => edges.map(edge => edge.node));
    this.set('options', promise);
  },
});
