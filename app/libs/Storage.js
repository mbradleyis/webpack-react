export default {
  get: function(k) {
    console.log('get', k);
    try {
      var data = JSON.parse(localStorage.getItem(k));
      console.log(data);
      return data;
    }
    catch(e) {
      return null;
    }
  },
  set: function(k, v) {
    console.log('set', k, v);
    localStorage.setItem(k, JSON.stringify(v));
  }
};
