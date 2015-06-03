import React from 'react';

export default class Note extends React.Component {
  constructor(props: {
    title: string;
    details: string;
    onEdit: Function;
  }) {
    super(props);
    var edited;
    if(this.props.title === ''){
      edited = true;
    }else{
      edited = false;
    }

    this.state = {
      edited: edited
    };

  }
  render() {
    var title = this.props.title;
    var details = this.props.details;
    console.log(title, details);
    var edited = (title === '' || this.state.edited);

    return (
      <div>{
        edited
        ? <div>
          <input ref="taskInput" placeholder="Enter a title" className="edit-input" type="text"
            defaultValue={title}
          />
          <br/>
          <textarea ref="taskDetails" placeholder="Enter details" className="edit-input"
            defaultValue={details}
            onBlur={this.finishEdit.bind(this)}
            onKeyPress={this.checkEnter.bind(this)}/>
          </div>
        : <div onClick={this.edit.bind(this)}>{title}<br/>{details}</div>
      }</div>
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
  edit() {
    this.setState({
        edited: true
    });
  }
  checkEnter(e) {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }
  finishEdit() {
    console.log(this.refs);
    this.props.onEdit({
      title: this.refs.taskInput.getDOMNode().value,
      details: this.refs.taskDetails.getDOMNode().value
    });

    this.setState({
      edited: false
    });
  }
}
