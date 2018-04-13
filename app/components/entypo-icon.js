import Component from '@ember/component';
import { computed } from '@ember/object';

const EntypoComponent = Component.extend({
  tagName: 'span',
  classNames: ['icon'],
  classNameBindings: ['iconClass'],

  iconClass: computed('name', function() {
    return `icon-${this.get('name')}`;
  }),
});

EntypoComponent.reopenClass({
  positionalParams: ['name'],
});

export default EntypoComponent;
