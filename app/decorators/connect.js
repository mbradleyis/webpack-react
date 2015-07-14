import React from 'react';

export default (Component, store) => {
  return class Connect extends React.Component {
    constructor(props) {
      super(props);
      this.storeChanged = this.storeChanged.bind(this);
      this.state = store.getState();
    }
    componentDidMount() {
      store.listen(this.storeChanged);
      this.setState(store.getState());
    }
    componentWillUnmount() {
      store.unlisten(this.storeChanged);
    }
    storeChanged() {
      this.setState(store.getState());
    }
    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };
};
