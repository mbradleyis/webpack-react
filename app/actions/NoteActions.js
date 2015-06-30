import alt from '../libs/alt';

class NoteActions {
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
