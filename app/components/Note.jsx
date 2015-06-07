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
    var editedTitle = (title === '');
    var editedDetails = (details === '');

    return (
      <div>
        <ContentEditable ref="titleInput" onEdit={this.finishEdit.bind(this)} content={title} edited={editedTitle} placeholder="Enter a title" />
        <ContentEditable ref="detailsInput" onEdit={this.finishEdit.bind(this)} content={details} edited={editedDetails} placeholder="Enter a title" />
        <div>created on {this.props.note.dateCreated}</div>
      </div>
    );
  }
  finishEdit() {
    var title = this.refs.titleInput.refs.contentInput.getDOMNode().value;
    var details = this.refs.detailsInput.refs.contentInput.getDOMNode().value;

    if(!title || !details){
      return;
    }else{
      this.props.onEdit({
        title: title,
        details: details
      });
    }
    
    this.setState({
      title: title ? title : '',
      details: details ? details : ''
    });
  }
}
