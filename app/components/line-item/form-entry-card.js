import Component from '@ember/component';
import { ComponentQueryManager } from 'ember-apollo-client';

export default Component.extend(ComponentQueryManager, {
  classNames: ['col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'],

  canEdit: true,
  showTitle: false,
  showEntryNo: true,
});
