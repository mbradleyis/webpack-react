import React from 'react';
import ContentEditable from './ContentEditable';

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
    var editedTitle = (title === '' || this.state.editedTitle);
    var editedDetails = (details === '' || this.state.editedDetails);

    return (
      <div>
        <ContentEditable onEdit={this.props.onEdit} content={title} edited={editedTitle} placeholder="Enter a title" />
        <ContentEditable onEdit={this.props.onEdit} content={details} edited={editedDetails} placeholder="Enter a title" />
        <div>created on {this.props.note.dateCreated}</div>
      </div>
    );
  }
}
