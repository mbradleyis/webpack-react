// import './stylesheets/main.css';
//
// import React from 'react';
// import App from './components/App';
//
// main();
//
// function main() {
//   React.render(<App />, document.getElementById('app'));
// }


/** In this file, we create a React component which incorporates components provided by material-ui */
let App = require('./components/App');
let React = require('react');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

let Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  },

  render() {
    return (
      <App />
    );
  }
});
React.render(<Main />, document.body);
