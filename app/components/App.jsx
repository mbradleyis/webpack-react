import React from 'react';
import Notes from './Notes';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      notes: [],
      emptyError: ''
    };
  }
  render() {

    var notes = this.state.notes;
    var errorStyle = {
      color: 'red'
    };
    return (
      <div>
        <button onClick={this.addItem.bind(this)}>Add a new note</button>
        <div style={errorStyle}>{this.state.emptyError}</div>
          <Notes items={notes} onEdit={this.itemEdited.bind(this)} />
        </div>
    );
  }
  addItem() {
    this.setState({
      notes: this.state.notes.concat([{
        title: '',
        details: '',
        dateCreated: new Date().toString()
      }])
    });
  }
  itemEdited(i, note) {
    var notes = this.state.notes;
    var emptyError = false;
    if(note.title) {
      notes[i].title = note.title;
      emptyError = '';
    }
    if(note.details) {
      notes[i].details = note.details;
      emptyError = '';
    }

    if(!note.title && !note.details) {
      notes = notes.slice(0, i).concat(notes.slice(i + 1));
      emptyError = 'Empty notes are not allowed.';
    }

    this.setState({
      notes: notes,
      emptyError: emptyError
    });
  }
}
