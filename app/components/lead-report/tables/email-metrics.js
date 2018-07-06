import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  tagName: 'table',
  classNames: ['table', 'table-striped', 'table-sm'],

  title: null,

  init() {
    this._super(...arguments);
    this.set('iframe', {
      show: false,
      title: null,
      src: null,
    });
  },

  didInsertElement() {
    // const title = this.get('title');
    // const table = this.$().DataTable({
    //   aaSorting: [],
    //   buttons: [
    //     { extend: 'excelHtml5', title: title },
    //     { extend: 'csvHtml5', title: title },
    //   ],
    // });

    // $(table.table().container()).addClass('px-0');

    // table.buttons().container()
    //   .addClass('float-right')
    //   .appendTo('#' + this.$().attr('id') + '_wrapper .col-md-6:eq(1)')
    // ;
  },

  actions: {
    displayIframeModal(deployment) {
      this.set('iframe.title', get(deployment, 'name'));
      this.set('iframe.src', get(deployment, 'url'));
      this.set('iframe.show', true);
    },
  },
});
