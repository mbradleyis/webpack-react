let Firebase = require('firebase');
let myFirebaseRef = new Firebase('https://webpack-react.firebaseio.com/');

export default {
  get: function(k, callback) {
    try {
      let data;
      myFirebaseRef.child(k).on('value', function(snapshot) {
        data = snapshot.val();
        callback(data);
      });
    }
    catch(e) {
      return null;
    }
  },
  set: function(k, v) {
    if(v.notes && v.notes.hasOwnProperty('undefined')){
      delete v.notes.undefined;
    }
    myFirebaseRef.child(k).set(v);
  }
};
