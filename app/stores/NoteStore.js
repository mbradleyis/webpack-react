import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';
import {findIndex} from 'lodash';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);
  }
  init(data) {
    this.setState(data || {notes: []});
  }
  create(task) {
    const notes = this.notes;
    this.setState({
      notes: notes.concat(task),
    });
  }
  update(task) {
    const notes = this.notes;
    var index = findIndex(notes, function(note) {
      return note.id === task.id;
    });
    notes[index] = task;

    this.setState({notes: notes});
  }
  remove(id) {
    const notes = this.notes;
    var index = findIndex(notes, function(note) {
      return note.id === id;
    });

    var result = notes.slice(0, index).concat(notes.slice(index + 1));
    this.setState({
      notes: result,
    });
  }
}

export default alt.createStore(NoteStore);
