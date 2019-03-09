import Service, { inject } from '@ember/service';
import { computed } from '@ember/object';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';
import Permissions from 'leads-manage/objects/permissions';

export default Service.extend(ObjectQueryManager, {
  loadingDisplay: inject(),
  session: inject(),
  auth: inject(),

  model: computed.reads('auth.response.user'),

  isAuthenticated: computed.reads('session.isAuthenticated'),

  role: computed('isAuthenticated', 'model.role', function() {
    if (!this.get('isAuthenticated')) return null;
    return this.get('model.role');
  }),

  roleIs(...roles) {
    const role = this.get('role');
    if (!role) return false;
    return roles.includes(role);
  },

  permissions: computed('role', function() {
    const perms = Permissions.create();
    const role = this.get('role');
    if (!role) return perms;

    if (this.roleIs('Administrator')) {
      perms.fullAccess();
    } else {
      perms.set('campaign', { create: true, edit: true, list: true });
      perms.set('order', { create: true, edit: true, list: true });
    }
    return perms;
  }),

  logout() {
    const loader = this.get('loadingDisplay');
    loader.show();
    return this.get('session').invalidate()
      .finally(loader.hide())
    ;
  }
});
