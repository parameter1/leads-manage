import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import moment from 'moment';
import { computed } from '@ember/object';

import query from 'leads-manage/gql/queries/fuel/sender-profiles';

export default Route.extend(RouteQueryManager, {
  sendDateTime: computed(function() {
    const now = moment();
    if (now.format('mm') >= '30') {
      return moment().endOf('hour').add(1, 'minute').subtract(59, 'seconds');
    }
    return moment().endOf('hour').subtract(29, 'minutes').subtract(59, 'seconds');
  }),

  model() {
    const deployment = this.modelFor('email.deployment.edit');
    const { subject } = deployment;
    return {
      step: 1,
      dedupeEmails: true,
      dataExtensions: [],
      publication: null,
      exclusions: [],
      subject,
      isTestSend: false,
      senderProfile: null,
      sendType: 'Immediately',
      sendDateTime: this.get('sendDateTime'),
      defaultSendDateTime: this.sendDateTime,
    };
  },

  afterModel() {
    return this.get('apollo').watchQuery({ query, fetchPolicy: 'network-only' }, 'Fuel_SenderProfiles').then((data) => {
      this.controllerFor(this.get('routeName')).set('senderProfiles', data);
    });
  },
});
