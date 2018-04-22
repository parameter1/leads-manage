import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | form/edit/entries', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:form/edit/entries');
    assert.ok(route);
  });
});
