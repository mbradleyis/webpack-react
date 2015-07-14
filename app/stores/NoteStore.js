import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);
  }
  init(data) {
    this.setState(data || {notes: []});
    console.log('init ', data);
  }
  create(task) {
    const notes = this.notes;

    this.setState({
      notes: notes.concat(task),
    });
  }
  update({id, task}) {
    console.log('update', this.notes);
    const notes = this.notes;
    console.log('update', notes);
    notes[id] = task;

    this.setState({notes: notes});
  }
  remove(id) {
    const notes = this.notes;

    this.setState({
      notes: notes.slice(0, id).concat(notes.slice(id + 1)),
    });
  }
}

export default alt.createStore(NoteStore);
