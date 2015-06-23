import React from 'react';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = NoteStore.getState();
  }
  componentDidMount() {
    NoteStore.listen(this.storeChanged.bind(this));
  }
  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged.bind(this));
  }
  storeChanged(state) {
    this.setState(state);
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
    NoteActions.create('New task');
  }
  itemEdited(id, task) {
    if(task) {
      NoteActions.update(id, task);
    }
    else {
      NoteActions.remove(id);
    }
  }
}
