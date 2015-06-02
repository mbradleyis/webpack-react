import React from 'react';

export default class Note extends React.Component {
  constructor(props: {
    task: string;
    onEdit: Function;
  }) {
    super(props);
    var edited;
    if(this.props.task === ''){
      edited = true;
    }else{
      edited = false;
    }

    this.state = {
      edited: edited
    };

  }
  render() {
    var task = this.props.task;
    var edited = (task === '' || this.state.edited);

    return (
      <div>{
        edited
        ? <input ref="taskInput" placeholder="Enter a note" className="edit-input" type="text"
          defaultValue={task}
          onBlur={this.finishEdit.bind(this)}
          onKeyPress={this.checkEnter.bind(this)}/>
        : <div onClick={this.edit.bind(this)}>{task}</div>
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
  finishEdit(e) {
    this.props.onEdit(e.target.value);

    this.setState({
      edited: false
    });
  }
}
