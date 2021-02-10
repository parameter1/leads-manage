import Component from '@ember/component';
import { computed, observer, set } from '@ember/object';

export default Component.extend({
  classNames: ['card'],
  urlGroup: null,

  shouldSelectAll: false,
  shouldDeselectAll: false,

  allSendGroups: computed('urlGroup.deploymentGroups.[]', function() {
    return this.get('urlGroup.deploymentGroups').reduce((acc, dep) => acc.concat(dep.sendGroups), []);
  }),

  isUrlActive: computed('allSendGroups.@each.active', function() {
    return this.get('allSendGroups').reduce((bool, sg) => sg.active ? true : bool, false);
  }),

  onSelectAll: observer('shouldSelectAll', function() {
    if (this.get('shouldSelectAll')) this.setAllSendGroupsActive(true);
  }),

  onDeselectAll: observer('shouldDeselectAll', function() {
    if (this.get('shouldDeselectAll')) this.setAllSendGroupsActive(false);
  }),

  setAllSendGroupsActive(active) {
    const sendGroups = this.get('allSendGroups');
    sendGroups.forEach(sendGroup => set(sendGroup, 'active', active));
  },

  actions: {
    toggleUrlGroupActive(event) {
      const { target } = event;
      const { checked } = target;
      this.setAllSendGroupsActive(checked);
      this.send('sendChange');
    },
    sendChange() {
      this.get('on-change')();
    },
  },

});
