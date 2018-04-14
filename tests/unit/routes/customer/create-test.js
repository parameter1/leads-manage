import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | customer/create', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:customer/create');
    assert.ok(route);
  });
});
