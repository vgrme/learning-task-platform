import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {plansActions, tasksActions} from 'redux/modules';
import FlatButton from 'material-ui/lib/flat-button';
import Colors from 'material-ui/lib/styles/colors';

@connect(
  state => ({}),
  { ...plansActions, ...tasksActions })
export default class SideDetails extends Component {
  static propTypes = {
    plan: PropTypes.object.isRequired,
    changePlanActiveValue: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired
  };

  render() {
    const {plan} = this.props;
    const {changePlanActiveValue, addTask} = this.props;  //from actions

    const btnStyle = {
      float: 'right',
      border: '1px solid',
      borderColor: Colors.brown500,
      lineHeight: '20px',
      margin: '20px 0 0 10px',
      minWidth: '30px',
      fontWeight: '0',
      fontSize: '10px'
    };

    const archiveLabel = plan.active? 'Archive': 'UnArchive';

    return (
      <div className="clearfix">
        {plan.active? '': <div className="float-left">(archived)</div>}
        <FlatButton style={btnStyle} label={archiveLabel} onClick={()=>changePlanActiveValue(plan)}/>
        <FlatButton style={btnStyle} label="Notes"/>
        <FlatButton style={btnStyle} label="+ Task" onClick={()=>addTask(plan._id)}/>
      </div>
    );
  }
}
