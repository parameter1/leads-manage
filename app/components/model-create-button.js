import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-lg', 'btn-success', 'create', 'fixed-bottom', 'float-right'],
  attributeBindings: ['title'],
  label: 'Create',
  title: 'Create New Record',
});
