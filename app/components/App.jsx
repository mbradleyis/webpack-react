import React from 'react';
import Notes from './Notes';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      notes: []
    };
  }
  render() {

    var notes = this.state.notes;

    return (
      <div>
        <button onClick={this.addItem.bind(this)}>+</button>
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

    if(task) {
      notes[i].task = task;
    }
    else {
      notes = notes.slice(0, i).concat(notes.slice(i + 1));
    }

    this.setState({
      notes: notes
    });
  }
}
