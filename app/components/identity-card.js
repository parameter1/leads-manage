import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import FormMixin from 'leads-manage/mixins/form-mixin';

import identityActivation from 'leads-manage/gql/mutations/identity/activation';
import identityCampaignActivation from 'leads-manage/gql/mutations/identity/campaign-activation';
import identityCustomerActivation from 'leads-manage/gql/mutations/identity/customer-activation';

export default Component.extend(ComponentQueryManager, FormMixin, {
  identityAttributes: inject(),

  classNameBindings: ['_getColumnClasses'],

  fullWidth: false,

  init() {
    this._super(...arguments);

    // Ensure the action has ended.
    // Fixes issue with calling set on destroyed object after status is updated or creative is removed.
    this.endAction();
  },

  _getColumnClasses: computed('fullWidth', function() {
    if (this.get('fullWidth')) {
      return 'col-12';
    }
    return 'col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3';
  }),

  _isInactive: computed('_isInactiveGlobally', '_isInactiveCustomer', '_isInactiveCampaign', function() {
    let inactive = false;
    const props = ['_isInactiveGlobally', '_isInactiveCustomer', '_isInactiveCampaign'];
    props.forEach(prop => {
      if (true === this.get(prop)) {
        inactive = true;
      }
    });
    return inactive;
  }),

  _inactiveCustomerIds: computed.mapBy('identity.inactiveCustomers', 'id'),
  _inactiveCampaignIds: computed.mapBy('identity.inactiveCampaigns', 'id'),

  _isInactiveCampaign: computed('_inactiveCampaignIds.[]', 'campaignId', function() {
    return this.get('_inactiveCampaignIds').includes(this.get('campaignId'));
  }),

  _isInactiveCustomer: computed('_inactiveCustomerIds.[]', 'customerId', function() {
    return this.get('_inactiveCustomerIds').includes(this.get('customerId'));
  }),

  _isInactiveGlobally: computed('identity.inactive', function() {
    return this.get('identity.inactive') ? true : false;
  }),

  actions: {
    /**
     *
     */
    async toggleGlobalActivation() {
      this.startAction();
      const identityId = this.get('identity.id');
      const inactive = !this.get('identity.inactive');
      const input = { identityId, active: !inactive };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: identityActivation, variables }, 'identityActivation');
        this.get('notify').info('Global identity activation set.');
      } catch (e) {
        this.get('graphErrors').show(e);
        this.endAction();
      }
    },

    /**
     *
     */
    async toggleCustomerActivation() {
      this.startAction();
      const identityId = this.get('identity.id');
      const customerId = this.get('customerId');
      const inactive = !this.get('_isInactiveCustomer');
      const input = { identityId, customerId, active: !inactive };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: identityCustomerActivation, variables }, 'identityCustomerActivation');
        this.get('notify').info('Customer identity activation set.');
      } catch (e) {
        this.get('graphErrors').show(e);
        this.endAction();
      }
    },

    /**
     *
     */
    async toggleCampaignActivation() {
      this.startAction();
      const identityId = this.get('identity.id');
      const campaignId = this.get('campaignId');
      const inactive = !this.get('_isInactiveCampaign');
      const input = { identityId, campaignId, active: !inactive };
      const variables = { input };

      try {
        await this.get('apollo').mutate({ mutation: identityCampaignActivation, variables }, 'identityCampaignActivation');
        this.get('notify').info('Campaign identity activation set.');
      } catch (e) {
        this.get('graphErrors').show(e);
        this.endAction();
      }
    },
  },

});
