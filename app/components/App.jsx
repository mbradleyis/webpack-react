import React from 'react';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import storage from '../libs/Storage';
import persist from '../decorators/persist';
import connect from '../decorators/connect';
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;

const noteStorageName = 'notes';

class App extends React.Component {
  constructor(props) {
    super(props);

    NoteActions.init(storage.get(noteStorageName));

    this.state = NoteStore.getState();
  }
  storeChanged() {
    this.setState(NoteStore.getState());
  }
  render() {
    var notes = this.props.notes;
    if(!notes){
      notes = [];
    }
    return (
      <div>
        <RaisedButton onClick={this.addItem.bind(this)} label="add a new note" primary={true} />
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
    var notes = this.props.notes;
    if(note.title) {
      notes[id].title = note.title;
    }
    if(note.details) {
      notes[id].details = note.details;
    }

    if(!note.title && !note.details) {
      NoteActions.remove(id);
    }else{
      NoteActions.update(id, note);
    }
  }
}

export default persist(
  connect(App, NoteStore),
  storage,
  noteStorageName,
  () => NoteStore.getState()
);
