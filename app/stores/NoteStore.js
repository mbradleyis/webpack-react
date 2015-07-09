import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);
  }
  init(data) {
    this.setState(data || {notes: []});
  }
  create(note) {
    const notes = this.notes;
    this.setState({
      notes: notes.concat({note})
    });
  }
  update({id, note}) {
    const notes = this.notes;

    notes[id] = note;

    this.setState({
      notes: notes
    });
  }
  remove(id) {
    const notes = this.notes;

    this.setState({
      notes: notes.slice(0, id).concat(notes.slice(id + 1))
    });
  }
}

export default alt.createStore(NoteStore, 'NoteStore');
