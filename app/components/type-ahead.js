import Component from '@ember/component';
import { isArray } from '@ember/array';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import customerQuery from 'leads-manage/gql/queries/search-customers';
import tagQuery from 'leads-manage/gql/queries/search-tags';

export default Component.extend(ComponentQueryManager, {
  errorProcessor: inject(),

  closeOnSelect: true,
  allowClear: true,
  multiple: false,
  timeout: 600,
  type: null,
  field: 'name',
  selected: null,
  placeholder: null,
  disabled: false,

  _query: computed('type', function() {
    const type = this.get('type');
    switch (type) {
      case 'customer':
        return { query: customerQuery, resultKey: 'searchCustomers.edges' };
      case 'tag':
        return { query: tagQuery, resultKey: 'searchTags.edges' };
    }
    this.get('errorProcessor').show(new Error(`The model type ${type} is not searchable.`));
  }),

  _pagination: computed('type', 'term', 'page', function() {
    // @todo this should actually be paginated, probably
    return { first: 20 };
  }),

  search: task(function* (term) {
    const pagination = this.get('_pagination');
    const field = this.get('field');
    const search = { typeahead: { field, term } };
    const variables = { pagination, search };
    const { query, resultKey } = this.get('_query');
    const selected = this.get('selected') || [];
    const filterFrom = isArray(selected) ? selected : [ selected ];
    yield timeout(this.get('timeout'));
    return this.get('apollo').watchQuery({ query, variables }, resultKey)
      .then(r => r.map(i => i.node))
      .then(r => r.filter(i => filterFrom.filterBy('id', i.id).length === 0))
      .catch(e => this.get('errorProcessor').show(e))
    ;
  }),
});
