'use strict';
var expect = require('chai').expect;
var Storage = require('../lib/local-storage');
var storage = new Storage();
var item = {
  data: 'abc'
}
before(function (done) {
  storage.insert({}, function (err, doc) {
    item._id = doc._id;
    done();
  })
})
after(function (done) {
  storage.remove({}, function (err, result) {
    done();
  })
})
describe('storage', function () {
  it('.constructor', function () {
    expect(storage).to.be.instanceof(Storage);
    expect(storage).to.have.key('_datastore');
  })
  it('.insert', function () {
    expect(storage.insert).to.be.a('function');
  })
  it('.find', function () {
    expect(storage.find).to.be.a('function');
  })
  it('.findOne', function () {
    expect(storage.findOne).to.be.a('function');
  })
  describe('.update', function () {
    expect(storage.update).to.be.a('function');
    it('should return no id error', function (done) {
      storage.update({}, function (err, result) {
        expect(err).to.be.an('object');
        expect(err).to.have.property('error', 'No _id found');
        done();
      })
    })
    it('should update', function (done) {
      storage.update(item, function (err, result) {
        if (err) {
          console.error(err);
          return done();
        }
        expect(result).to.be.an('object');
        expect(result).to.have.property('data', 'abc');
        expect(result).to.contain.keys('createdAt', 'updatedAt');
        done();
      })
    })
  })

  describe('.remove', function () {
    expect(storage.remove).to.be.a('function');
    it('should return no id error', function (done) {
      storage.remove({value: 5}, function (err, result) {
        expect(err).to.have.property('error', 'No _id found');
        done();
      })
    })

    it('should delete 1 document', function (done) {
      storage.remove({_id: item._id}, function (err, result) {
        if(err) {
          console.error(err);
          return done();
        }
        expect(result).to.be.equal(1);
        done();
      })
    })
  })
})