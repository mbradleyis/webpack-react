import React from 'react';

export default class ContentEditable extends React.Component {
  constructor(props: {
    content: string;
    placeholder: string;
    onEdit: Function;
  }) {
    super(props);
  }
  render() {
    var content = this.props.content;
    var placeholder = this.props.placeholder;
    var edited = (content === '');
    var contentComponent = (edited
      ? <div>
          <input ref="contentInput" placeholder={placeholder} className="edit-input" type="text"
            onKeyPress={this.checkEnter.bind(this)}
            defaultValue={content}
          />
        </div>
      :
        <div onClick={this.editContent.bind(this)}>{content}</div>
    );

    return (
      <div>
          {contentComponent}
      </div>
    );
  }
  // componentDidMount(){
  //   if(this.refs.contentInput){
  //     this.refs.contentInput.getDOMNode().focus();
  //   }
  // }
  // componentDidUpdate(){
  //   if(this.refs.contentInput){
  //     this.refs.contentInput.getDOMNode().focus();
  //   }
  // }
  editContent() {
    this.setState({
        edited: true
    });
  }
  checkEnter(e) {
    if(e.key === 'Enter') {
      this.props.onEdit();
    }
  }
}
