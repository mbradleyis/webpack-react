export default {
  get: function(k) {
    try {
      var data = JSON.parse(localStorage.getItem(k));
      return data;
    }
    catch(e) {
      return null;
    }
  },
  set: function(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  }
};
