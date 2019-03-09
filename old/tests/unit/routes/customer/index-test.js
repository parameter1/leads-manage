import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | customer/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:customer/index');
    assert.ok(route);
  });
});
