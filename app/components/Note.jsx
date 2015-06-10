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
    var editedTitle = title === '' ? true : false;
    var editedDetails = details === '' ? true : false;
    var focusOnEmpty = (!editedTitle || !editedDetails);

    return (
      <div>
        <ContentEditable focusOnEmpty={focusOnEmpty} single="true" ref="titleInput" onEdit={this.finishEdit.bind(this)} content={title} edited={editedTitle} placeholder="Enter a title" />
        <ContentEditable ref="detailsInput" onEdit={this.finishEdit.bind(this)} content={details} edited={editedDetails} placeholder="Enter a description" />
        <div>created on {this.props.note.dateCreated}</div>
      </div>
    );
  }
  finishEdit() {
    var title = this.refs.titleInput.refs.contentInput ? this.refs.titleInput.refs.contentInput.getDOMNode().value : this.props.note.title;
    var details = this.refs.detailsInput.refs.contentInput ? this.refs.detailsInput.refs.contentInput.getDOMNode().value : this.props.note.details;

    if(!title || !details){
      return;
    }else{
      this.props.onEdit({
        title: title,
        details: details
      });
    }

    this.setState({
      title: title ? title : this.props.title,
      details: details ? details : this.props.details
    });
  }
}
