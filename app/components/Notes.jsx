import React from 'react';
import Note from './Note';

export default class Notes extends React.Component {
  constructor(props: {
    items: Array;
    onEdit: Function;
  }) {
    super(props);
  }
  render() {
    var notes = this.props.items;
    return (
      <div className='notes'>{notes.map((note, i) =>
        <div className='note' key={'note' + i}>
          <Note
            note={note}
            onEdit={this.props.onEdit.bind(this, i)} />
        </div>
      )}</div>
    );
  }
}
