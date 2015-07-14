import React from 'react';

export default (Component, storage, storageName, getData) => {
  return class Persist extends React.Component {
    constructor(props) {

      console.log('persist props', props);
      super(props);
      window.addEventListener('beforeunload', function() {
        // escape hatch for debugging
        if(!storage.get('debug')) {
          storage.set(storageName, getData());
        }
      }, false);
    }
    render() {
      console.log('persist render props', this.props);
        console.log('persist render state', this.state);
      return <Component {...this.props} {...this.state} />;
    }
  };
};
