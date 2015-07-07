import Serializer from 'ember-cli-mirage/serializer';

import {module, test} from 'qunit';

function newMockContact(attrs) {
  return  {
    type: 'contact',
    get attrs() {
      return attrs;
    }
  };
}

module('mirage:serializer', {
  beforeEach: function() {
    this.serializer = new Serializer();
  }
});

test('it returns pojos unaffected', function(assert) {
  var result = this.serializer.serialize({oh: 'hai'});

  assert.deepEqual(result, {oh: 'hai'});
});

test(`it serializes a model by returning its attrs under a key of the model's type`, function(assert) {
  var mockModel = newMockContact({
    id: 1,
    name: 'Link',
    age: 323,
  });

  var result = this.serializer.serializeModel(mockModel);
  assert.deepEqual(result, {
    contact: {
      id: 1,
      name: 'Link',
      age: 323
    }
  });
});

test(`it serializes a collection of models by returning an array of their attrs under a key of the model's type`, function(assert) {
  var mockCollection = [
    newMockContact({id: 1, name: 'Link', age: 323}),
    newMockContact({id: 2, name: 'Zelda', age: 401})
  ];

  var result = this.serializer.serializeCollection(mockCollection);
  assert.deepEqual(result, {
    contacts: [
      {id: 1, name: 'Link', age: 323},
      {id: 2, name: 'Zelda', age: 401}
    ]
  });
});
