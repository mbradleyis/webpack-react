import alt from '../libs/alt';

class NoteActions {
  create(task) {
    this.dispatch(task);
  }
  update(id, task) {
    this.dispatch({id, task});
  }
  remove(id) {
    this.dispatch(id);
  }
}

export default alt.createActions(NoteActions);
