import React from 'react';
let mui = require('material-ui');
let TextField = mui.TextField;
let Paper = mui.Paper;

export default class Note extends React.Component {
  constructor(props: {
    title: string;
    details: string;
    onEdit: Function;
  }) {
    super(props);
  }
  render() {
    var title = this.props.note.title;
    var details = this.props.note.details;
    return (
      <Paper zDepth={1}>
        <div>
        <TextField ref="titleInput" hintText="Enter a title" value={title} onChange={this.finishEdit.bind(this)} />
        </div>
        <div><TextField multiLine={true} ref="detailsInput" hintText="Enter a title" value={details} onChange={this.finishEdit.bind(this)} />
        </div>
        <div>created on {this.props.note.dateCreated}</div>
      </Paper>
    );
  }
  finishEdit() {
    var title = this.refs.titleInput.getValue();
    var details = this.refs.detailsInput.getValue();
    this.props.onEdit({
      title: title,
      details: details
    });
  }
}
