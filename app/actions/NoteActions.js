import alt from '../libs/alt';

class NoteActions {
  init(notes) {
    this.dispatch(notes);
  }
  create(note) {
    this.dispatch(note);
  }
  update(id, note) {
    this.dispatch({id, note});
  }
  remove(id) {
    this.dispatch(id);
  }
}

export default alt.createActions(NoteActions);
