'use strict';
var Datastore = require('nedb');
function LocalStorage(path, inMemoryOnly) {
  this._datastore = new Datastore({
    filename : path || './db/local-storage.db',
    autoload: true,
    timestampData: true,
    inMemoryOnly: inMemoryOnly
  });
};

LocalStorage.prototype.insert = function (doc, cb) {
  this._datastore.insert(doc, function (err, result) {
    if (err) return cb(err);
    cb(null, result);
  })
}

LocalStorage.prototype.find = function (params, cb) {
  this._datastore.find(params, function (err, docs) {
    if (err) return cb(err);
    cb(null, docs);
  })
}

LocalStorage.prototype.findOne = function (params, cb) {
  this._datastore.findOne(params, function (err, doc) {
    if (err) return cb(err);
    cb(null, doc);
  })
}
//require _id; only two arguments
LocalStorage.prototype.update = function (item, cb) {
  if (!item.hasOwnProperty('_id')) {
    return cb({
      error: 'No _id found'
    });
  }
  var toUpdate = {
    _id: item._id
  }
  var options = {
    returnUpdatedDocs: true
  }
  this._datastore.update(toUpdate, item, options,
    function (err, num, doc, upsert) {
      if (err) return cb(err);
      cb(null, doc);
    })
}

//accepts only _id; two arguments
LocalStorage.prototype.remove = function (item, cb) {
  if (Object.keys(item).length > 0 && !item.hasOwnProperty('_id')) {
    return cb({
      error: 'No _id found'
    });
  }
  var toDelete = {
    _id: item._id
  }
  this._datastore.remove(toDelete, {}, function (err, num) {
    if (err) return cb(err);
    cb(null, num);
  })
}
module.exports = LocalStorage;