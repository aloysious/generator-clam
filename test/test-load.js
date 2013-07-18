/*global describe, beforeEach, it*/
'use strict';

var assert  = require('assert');

describe('clam generator', function () {
  it('can be imported without blowing up', function () {
    var app = require('../app');
    assert(app !== undefined);
  });
});
