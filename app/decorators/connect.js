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
      console.log('connect store changed', store.getState());
      this.setState(store.getState());
    }
    render() {
      console.log('connect render', this.props, this.state);
      return <Component {...this.props} {...this.state} />;
    }
  };
};
