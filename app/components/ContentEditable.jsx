import React from 'react';

export default class ContentEditable extends React.Component {
  constructor(props: {
    content: string;
    placeholder: string;
    onEdit: Function;
  }) {
    super(props);
    this.state = {
      edited: false
    };
  }
  render() {
    var content = this.props.content;
    var placeholder = this.props.placeholder;
    var single = this.props.single;
    var edited = (this.props.edited || this.state.edited);

    var field = single
    ?
      <input ref="contentInput" placeholder={placeholder} className="edit-input" type="text"
        onKeyPress={this.checkEnter.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        defaultValue={content}
      />
    :
      <textarea ref="contentInput" placeholder={placeholder} className="edit-input"
        onKeyPress={this.checkEnter.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        defaultValue={content}
      />;

    var contentComponent = (edited
      ? <div>
          {field}
        </div>
      :
        <div onDoubleClick={this.editContent.bind(this)}>{content}</div>
    );

    return (
      <div>
        {contentComponent}
      </div>
    );
  }
  componentDidMount(){
    if(this.state.edited || (this.props.focusOnEmpty && this.refs.contentInput && this.refs.contentInput.getDOMNode().value === '')){
      this.refs.contentInput.getDOMNode().focus();
    }
  }
  componentDidUpdate(){
    if(this.state.edited || (this.props.focusOnEmpty && this.refs.contentInput && this.refs.contentInput.getDOMNode().value === '')){
      this.refs.contentInput.getDOMNode().focus();
    }
  }
  editContent() {
    this.setState({
        edited: true
    });
  }
  handleBlur(){
    this.setState({
      edited: false
    });
    this.props.onEdit();
  }
  checkEnter(e) {
    if(e.key === 'Enter') {
      this.setState({
        edited: false
      });
      this.props.onEdit();
    }
  }
}
