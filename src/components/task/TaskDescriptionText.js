import React, {PropTypes} from 'react';


const TaskDescriptionText = (props) => {
  const {text} = props;

  const style = {
    ...props.style
  };

  const getTextJsx = (text) => {
    if(!text) return (<br/>);
    
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

  return (
    <div style={style}>
      {!text?'':text.split(/\r?\n/g).map((line, i) => 
        <div key={i}>
          {getTextJsx(line)}
         </div>
        )}
    </div>
  );

};

TaskDescriptionText.propTypes = {

};

export default TaskDescriptionText;