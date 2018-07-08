import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  adminFields: computed.filterBy('fields', 'adminOnly', true),

  getViewableFields: computed('fields.[]', function() {
    return this.get('fields');
    // @todo Enable once user manager service is working.
    // return this.get('fields').filter((field) => {
    //   if (get(field, 'adminOnly')) {
    //     return this.get('userManager.permissions.lead-campaign.admin-fields') ? true : false;
    //   } else {
    //     return true;
    //   }
    // });
  }),

  getFilteredFields(excluded) {
    return this.get('fields').reject((field) => excluded.indexOf(field.key) >= 0);
  },

  getFields() {
    return this.get('fields');
  },

  init() {
    this._super(...arguments);

    this.set('fields', [
      { key: 'emailAddress', label: 'Email' },
      { key: 'givenName', label: 'First Name' },
      { key: 'familyName', label: 'Last Name' },
      { key: 'title', label: 'Title' },
      { key: 'companyName', label: 'Company Name' },
      { key: 'street', label: 'Address' },
      { key: 'city', label: 'City' },
      { key: 'region', label: 'State' },
      { key: 'postalCode', label: 'Postal Code' },
      { key: 'country', label: 'Country' },
      { key: 'phoneNumber', label: 'Phone #', adminOnly: true },
      { key: 'attributes.Industry', label: 'Industry' },
      { key: 'attributes.Job Function', label: 'Job Function' },
      { key: 'attributes.NAICS Code', label: 'NAICS Code' },
    ]);

    this.set('cardBlocks', [
      {
        title: 'Company Info',
        fields: [
          { key: 'title' },
          { key: 'companyName' },
        ]
      },
      {
        title: 'Contact Info',
        fields: [
          { key: 'street' },
          { key: 'city', inline: true },
          { key: 'region', inline: true },
          { key: 'postalCode', inline: true },
          { key: 'country' },
          { key: 'phoneNumber', label: 'Tel' },
        ]
      },
      {
        title: 'Attributes',
        fields: [
          { key: 'attributes.Industry', label: 'Industry' },
          { key: 'attributes.Job Function', label: 'Job Function' },
          { key: 'attributes.NAICS Code', label: 'NAICS Code' },
        ]
      },
    ]);
  },
});
