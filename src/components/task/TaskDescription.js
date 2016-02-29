import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';

export default class TaskDescription extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    onDescriptionChange: PropTypes.func,
    onSubmitDescription: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      showEdit: false,
      showBorder: false
    };
  }

  render(){
    const {task, onDescriptionChange, onSubmitDescription} = this.props;

    const fontSize = 14;
    const lineHeight = '18px';

    const style = {
      border: this.state.showBorder?'1px solid #BFAF80':'',
      position: 'relative'
    };

    const descriptionStyle = {
      padding: '0 3px 0 3px',
      fontSize,
      lineHeight
    };

    const textStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: 'white',
      padding: '0 3px 0 3px',
      marginTop: 12,
      overFlow: 'hidden',
      fontSize,
      lineHeight
    };

    const hintStyle = {
      top: 12,
      left: 5
    };

    const handleDescriptionTextChange = (event) => {
      if(onDescriptionChange){
        onDescriptionChange(task._id, event.target.value);
      }
    };

    const enterDescription = () => {
      this.setState({
        showBorder: true
      });
    };

    const leaveDescription = () => {
      this.setState({
        showBorder: false,
        showEdit: false
      });
    };

    const handleFocus = () => {
      this.setState({
        showEdit: true
      });
    };

    const handleBlur = () => {
      this.setState({
        showEdit: false
      });
    };

    const getTextJsx = (text) => {
      var urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(urlExpression);  
      var urls = text.match(regex)||[];
      var nonUrls = urls.reduce((list, url) => {
        return list.map(l=>l.split(url))
                   .reduce((a,b) => {
                      return a.concat(b);
                    }, []);
      }, [text]);
      return nonUrls.map((t, i)=>{
        var url = urls[i];
        return (
          <span key={i}>
            <span>{t}</span>
            {!url?'':<a href={url} target="_blank" onClick={(e)=>e.stopPropagation()}>{url}</a>}
          </span>
          );
      });
    };

    const getDescriptionJsx = (description) => {
      if(description){
        const lines = description.split(/\r?\n/g);
        return lines.map((line, i) => {
          
          return (<div key={i}>
                  {getTextJsx(line)}
                 </div>);
        });
      }
    };

    return (
      <div style={style} onMouseEnter={enterDescription} onMouseLeave={leaveDescription} 
           onClick={handleFocus} onBlur={handleBlur}>
        <TextField style={descriptionStyle} value={task.description} multiLine={true} 
                   underlineShow={false} hintText="Description" hintStyle={hintStyle}
                   rows={2} fullWidth={true}
                   onChange={handleDescriptionTextChange} onBlur={onSubmitDescription} />
        {this.state.showEdit||!task.description?'':
          <div style={textStyle}>
            {getDescriptionJsx(task.description)}
          </div>}
      </div>
    );
  }
}