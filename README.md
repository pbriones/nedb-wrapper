# nedb-wrapper

Needed to use NeDB but didn't want to bother with setup all the time.

Also modified .remove and .update to fit my needs.

Installation
-----------
```
npm install --save nedb-wrapper
```

Usage
-----------
```
var Storage = require('nedb-wrapper')
var storage = new Storage(); //defaults to ./db/local-storage.db

//var storage = new Storage('./path/storage.db)
//var storage = new Storage(null, true)  for in-memory only
```

Currently includes as-is from NeDB:
* .find
* .findOne
* .insert

All original functionalities can be accessed with ._datastore

Modified Functionalities
-----------

.update(doc, cb)
```
//@doc - updated document; must have _id
var input = {
  _id: '1232334',
  value: 5
}
storage.update(input, function(err, result){
  if(err) return;
  //result is identical to input in this case
  //do stuff to result
}
```

.remove(doc, cb)
```
//@doc - document to delete; requires _id; ignores the rest
var input = {
  _id: '1232334',
  value: 5
}
storage.update(input, function(err, result){
  if(err) return;
  //result is identical to input in this case
  //result is number of deleted documents; always 1, hopefully
}
```