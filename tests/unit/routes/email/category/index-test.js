import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | email/category/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:email/category/index');
    assert.ok(route);
  });
});
