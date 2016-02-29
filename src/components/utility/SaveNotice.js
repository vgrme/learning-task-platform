import React, {Component, PropTypes} from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';

export default class SaveNotice extends Component {
  static propTypes = {
    mode: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      mode: '',
      inProcess: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.mode !== nextProps.mode){
      if(nextProps.mode==='saved'){
        setTimeout(()=>{
          this.setState({mode: 'saved', inProcess: this.state.inProcess+1});
          setTimeout(()=>{
            this.setState({inProcess: this.state.inProcess-1});
            if(!this.state.inProcess) this.setState({mode: ''});
          }, 5000);
        },100);
      }
      else{
        setTimeout(()=>{
          this.setState({mode: nextProps.mode});
        },100);
      }
    }
  }

  render() {
    const style = {
      height: 20,
      width: 100,
      position: 'relative'
    };

    const textStyle = {
      position: 'absolute',
      top: 5,
      left: 25
    };

    const errorStyle = {
      color: Colors.red500
    };

    const savedStyle = {
      color: Colors.green400
    };

    const saved = (<div style={savedStyle}>
        <FontIcon className= "material-icons" color={savedStyle.color}>done</FontIcon>
        <span style={textStyle}>saved</span>
      </div>);

    const error = (<div style={errorStyle}>
        <FontIcon className= "material-icons" color={errorStyle.color}>error_outline</FontIcon>
        <span style={textStyle}>error saving</span>
      </div>);

    const saving = '';

    const getDom = (mode) => {
      switch(mode){
        case 'saved':
          return saved;
        case 'error':
          return error;
        case 'saving':
          return saving;
        default:
          '';
      }
    };

    return (
      <div style={style}>
      {
        getDom(this.state.mode)
      }
      </div>
    );
  }

}