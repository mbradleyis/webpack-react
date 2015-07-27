let Firebase = require('firebase');
let myFirebaseRef = new Firebase('https://webpack-react.firebaseio.com/');
var connectedRef = new Firebase('https://webpack-react.firebaseio.com/.info/connected');
connectedRef.on('value', function(snap) {
  if (snap.val() === true) {
    console.log('connected');
  } else {
    console.log('not connected');
  }
});
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
