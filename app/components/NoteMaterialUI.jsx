import React from 'react';
let mui = require('material-ui');
let TextField = mui.TextField;
let Paper = mui.Paper;
let Dialog = mui.Dialog;
let RaisedButton = mui.RaisedButton;
let FlatButton = mui.FlatButton;

export default class Note extends React.Component {
  constructor(props: {
      title: string;
      details: string;
      onEdit: Function;
    }) {
    super(props);
    this.state = {};
    this.state.modal = true;
  }
  render() {
    var title = this.props.note.title;
    var details = this.props.note.details;
        //Standard Actions
        //Custom Actions
    let deleteDialogActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this._onDialogCancel.bind(this)} />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this._onDialogSubmit.bind(this)} />
    ];

    return (
      <Paper zDepth={1}>
        <Dialog
          title="Delete"
          ref="deleteDialog"
          actions={deleteDialogActions}
          actionFocus="Cancel"
          modal={true}>
          Are you sure you want to delete this item?
        </Dialog>
        <div>
        <TextField ref="titleInput" hintText="Enter a title" value={title} onChange={this.finishEdit.bind(this)} />
        </div>
        <div><TextField
           multiLine={true} ref="detailsInput" hintText="Enter a title" value={details} onChange={this.finishEdit.bind(this)} />
        </div>
        <div>{new Date(this.props.note.dateCreated).toString()}</div>
        <RaisedButton onClick={this._onDelete.bind(this)} label="Delete" primary={true} />

      </Paper>
    );
  }
  _onDelete(){
    this.refs.deleteDialog.show();
  }
  _onDialogSubmit(){
    this.props.onDelete(this.props.note);
    this.refs.deleteDialog.dismiss();
  }
  _onDialogCancel(){
    this.refs.deleteDialog.dismiss();
  }
  finishEdit() {
    var title = this.refs.titleInput.getValue();
    var details = this.refs.detailsInput.getValue();
    this.props.onEdit({
      title: title,
      details: details,
      id: this.props.note.id,
      dateCreated: this.props.note.dateCreated
    });
  }
}
