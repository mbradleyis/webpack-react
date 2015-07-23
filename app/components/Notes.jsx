import React from 'react';
import NoteMaterialUI from './NoteMaterialUI';

let mui = require('material-ui');
let List = mui.List;
let ListItem = mui.ListItem;

export default class Notes extends React.Component {
  constructor(props: {
    items: Array;
  }) {
    super(props);
  }
  render() {
    var notes = this.props.items;

    return (
      <List className='notes'>{notes.map((note, i) =>
        <ListItem className='note' key={'note' + i}>
          <div>{this.props.emptyError}</div>
          <NoteMaterialUI
            note={note}
            onEdit={this.props.onEdit.bind(this, i)}
            onDelete={this.props.onDelete.bind(this, i)}
          />
      </ListItem>
      )}</List>
    );
  }
}
