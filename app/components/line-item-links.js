import Component from '@ember/component';
import { get } from '@ember/object';
import { ComponentQueryManager } from 'ember-apollo-client';
import ActionMixin from 'leads-manage/mixins/action-mixin';

import query from 'leads-manage/gql/queries/line-item/email/edit/deployments/links';

export default Component.extend(ComponentQueryManager, ActionMixin, {
  lineItemId: null,
  isLoading: false,

  actions: {
    async load() {
      this.startAction();
      this.set('isLoading', true);
      const input = { id: this.get('lineItemId') };
      const variables = { input };

      try {
        const results = await this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'emailLineItem');
        this.set('urlGroups', get(results, 'urlGroups'));
        this.set('hasLoaded', true);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
        this.set('isLoading', false);
      }
    },
  },
});
