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
      <ul className='notes'>{notes.map((note, i) =>
        <li className='note' key={'note' + i}>
          <Note
            title={note.title}
            details={note.details}
            onEdit={this.props.onEdit.bind(this, i)} />
        </li>
      )}</ul>
    );
  }
}
