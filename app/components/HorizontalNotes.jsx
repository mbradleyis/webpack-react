import React from 'react';
import Note from './Note';

export default class HorizontalNotes extends React.Component {
  render() {
    var notes = this.props.items;

    return (
      <div className='horizontal-notes'>
        {notes.map((note, i) =>
          <span className='note' key={'note' + i}>
            <Note task={note.task} />
          </span>
        )}
      </div>
    );
  }
}
