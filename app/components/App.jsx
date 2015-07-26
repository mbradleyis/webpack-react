import React from 'react';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import storage from '../libs/FirebaseStorage';
import persist from '../decorators/persist';
import connect from '../decorators/connect';
import {sortBy} from 'lodash';

let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let Snackbar = mui.Snackbar;

const noteStorageName = 'notes';

class App extends React.Component {
  constructor(props) {
    super(props);

    NoteActions.init(storage.get(noteStorageName, this.onData.bind(this)));
    this.state = NoteStore.getState();
    this.state.savingMessage = '';
  }
  onData(data){
    NoteActions.init(data);
  }
  dismissSnackbar(){
    this.refs.snackbar.dismiss();
  }
  render() {
    var notes = this.props.notes;
    if(!notes){
      notes = [];
    }
    notes = sortBy(notes, 'dateCreated').reverse();

    return (
      <div>
        <Snackbar ref="snackbar" message={this.state.snackBarMessage || ''} autoHideDuration={1000} onActionTouchTap={this.dismissSnackbar}/>
        <RaisedButton onClick={this.addItem.bind(this)} label="New" primary={true} />
        <div>{this.state.savingMessage}</div>
        <Notes items={notes} onEdit={this.itemEdited.bind(this)} onDelete={this.itemDeleted.bind(this)} />
      </div>
    );
  }
  addItem() {
    let newItem = {
      title: '',
      details: '',
      dateCreated: new Date().getTime(),
      id: new Date().getTime()
    };

    NoteActions.create(newItem);
  }

  itemDeleted(note) {
    this.setState({
      snackBarMessage: 'Deleted - ' + note.title
    });
    NoteActions.remove(note.id);
    storage.set(noteStorageName, NoteStore.getState());
    this.refs.snackbar.show();
  }
  itemEdited(note) {
    if(!note.title && !note.details) {
      NoteActions.remove(note.id);
    }else{
      NoteActions.update(note);
    }

    storage.set(noteStorageName, NoteStore.getState());
    if(this.snackBarTimeout){
      // debounce snackbar
      clearTimeout(this.snackBarTimeout);
      this.startSnackbarTimeout(note);
    }else{
      this.setState({
        savingMessage: 'saving...'
      });
      this.startSnackbarTimeout(note);
    }
  }
  startSnackbarTimeout(note){
    var scope = this;
    this.snackBarTimeout = setTimeout(function(){

      scope.setState({
        debounceSaved: false,
        snackBarMessage: 'Saved - ' + note.title,
        savingMessage: ''
      });

      scope.refs.snackbar.show();
      delete scope.snackBarTimeout;
    }, 2000);
  }
}

export default persist(
  connect(App, NoteStore),
  storage,
  noteStorageName,
  () => NoteStore.getState()
);
