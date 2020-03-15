import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

import query from 'leads-manage/gql/queries/form/for-customer';

export default Component.extend({
  apollo: inject(),
  graphErrors: inject(),

  classNames: ['form-group'],

  customerId: null, // required;

  options: computed('customerId', function() {
    const variables = { customerId: this.get('customerId') };
    const promise = this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'allForms');
    return promise.then(({ edges }) => edges.map(edge => edge.node));
  }),
});
