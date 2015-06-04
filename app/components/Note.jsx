import React from 'react';

export default class Note extends React.Component {
  constructor(props: {
    title: string;
    details: string;
    onEdit: Function;
  }) {
    super(props);
    var editedTitle;
    var editedDetails;
    if(this.props.title === ''){
      editedTitle = true;
    }else{
      editedTitle = false;
    }
    if(this.props.details === ''){
      editedDetails = true;
    }else{
      editedDetails = false;
    }

    this.state = {
      editedTitle: editedTitle,
      editedDetails: editedDetails
    };

  }
  render() {
    var title = this.props.title;
    var details = this.props.details;
    var editedTitle = (title === '' || this.state.editedTitle);
    var editedDetails = (details === '' || this.state.editedDetails);
    var titleComponent = editedTitle
      ? <div>
          <input ref="taskInput" placeholder="Enter a title" className="edit-input" type="text"
            onBlur={this.finishTitleEdit.bind(this)}
            onKeyPress={this.checkTitleEnter.bind(this)}
            defaultValue={title}
          />
      </div>
      :
        <div onClick={this.editTitle.bind(this)}>{title}</div>;

    var detailsComponent = editedDetails
      ? <div>
          <textarea ref="taskDetails" placeholder="Enter details" className="edit-input"
            defaultValue={details}
            onBlur={this.finishDetailsEdit.bind(this)}
            onKeyPress={this.checkDetailsEnter.bind(this)}
          />
        </div>
      :
        <div onClick={this.editDetails.bind(this)}>{details}</div>;

    return (
      <div>
          {titleComponent}
          {detailsComponent}
      </div>
    );
  }
  componentDidMount(){
    if(this.refs.taskInput){
      this.refs.taskInput.getDOMNode().focus();
    }
  }
  componentDidUpdate(){
    if(this.refs.taskInput){
      this.refs.taskInput.getDOMNode().focus();
    }
  }
  editTitle() {
    this.setState({
        editedTitle: true
    });
  }
  editDetails() {
    this.setState({
        editedDetails: true
    });
  }
  checkTitleEnter(e) {
    if(e.key === 'Enter') {
      this.finishTitleEdit(e);
    }
  }
  checkDetailsEnter(e) {
    if(e.key === 'Enter') {
      this.finishDetailsEdit(e);
    }
  }
  finishTitleEdit() {
    this.props.onEdit({
      title: this.refs.taskInput.getDOMNode().value,
    });

    this.setState({
      editedTitle: false
    });
  }
  finishDetailsEdit() {
    this.props.onEdit({
      details: this.refs.taskDetails.getDOMNode().value
    });

    this.setState({
      editedDetails: false
    });
  }
}
