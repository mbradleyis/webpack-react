import React from 'react';

export default (Component, storage, storageName, getData) => {
  return class Persist extends React.Component {
    constructor(props) {
      super(props);

      window.addEventListener('beforeunload', function() {
        // escape hatch for debugging
        if(!storage.get('debug')) {
          storage.set(storageName, getData());
        }
      }, false);
    }
    render() {
      console.log('redering', Component);
      return <Component {...this.props} {...this.state} />;
    }
  };
};
