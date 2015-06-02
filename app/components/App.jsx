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

    return (
      <div>
        <button onClick={this.addItem.bind(this)}>Add a new note</button>
        <div>{this.state.emptyError}</div>
          <Notes items={notes} onEdit={this.itemEdited.bind(this)} />
          </div>
    );
  }
  addItem() {
    this.setState({
      notes: this.state.notes.concat([{
        task: ''
      }])
    });
  }
  itemEdited(i, task) {
    var notes = this.state.notes;
    var emptyError = false;
    if(task) {
      notes[i].task = task;
      emptyError = '';
    }
    else {
      notes = notes.slice(0, i).concat(notes.slice(i + 1));
      emptyError = 'Empty notes are not allowed.';
    }

    this.setState({
      notes: notes,
      emptyError: emptyError
    });
  }
}
