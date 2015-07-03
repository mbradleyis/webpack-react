import React from 'react';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import storage from '../libs/Storage';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    NoteActions.init(storage.get('notes'));

    this.state = NoteStore.getState();
  }
  componentDidMount() {
    NoteStore.listen(this.storeChanged.bind(this));
  }
  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged.bind(this));
  }
  storeChanged(state) {
    storage.set('notes', state);
    this.setState(NoteStore.getState());
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
    NoteActions.create({
      title: '',
      details: '',
      dateCreated: new Date().toString()
    });
  }

  itemEdited(id, note) {

    var notes = this.state.notes;
    var emptyError = false;
    if(note.title) {
      notes[id].title = note.title;
      emptyError = '';
    }
    if(note.details) {
      notes[id].details = note.details;
      emptyError = '';
    }

    if(!note.title && !note.details) {
      NoteActions.remove(id);
      emptyError = 'Empty notes are not allowed.';
    }

    if(note) {
      NoteActions.update(id, note);
    }
    else {
      NoteActions.remove(id);
    }

    this.setState({
      emptyError: emptyError
    });
  }
}
