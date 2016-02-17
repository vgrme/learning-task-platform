import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {plansActions, tasksActions} from 'redux/modules';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {CircleButton, AddTasksModal} from 'components';

@connect(
  state => ({
    currentPlanId: state.plans.currentPlanId,
    currentSectionId: state.plans.currentSectionId,
    tasks: state.tasks.list,
    addingBatchTasks: state.tasks.addingBatchTasks
  }),
  { ...plansActions, ...tasksActions })
export default class PlanActionBar extends Component {
  static propTypes = {
    plan: PropTypes.object.isRequired,
    changePlanActiveValue: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired
  };

  render() {
    const {plan, tasks, currentPlanId, currentSectionId, addingBatchTasks} = this.props;
    const {changePlanActiveValue, addTask, addBatchTasks, stopAddBatchTasks, saveBatchTasks} = this.props;  //from actions

    const archiveLabel = plan.active? 'Archive': 'UnArchive';

    const handleSaveBatchTasks = (mainName, number) =>{
      saveBatchTasks(mainName, number, tasks, currentSectionId, currentPlanId);
    };

    return (
      <div className="clearfix">
        {plan.active? '': <div className="float-left">(archived)</div>}
        <div className="float-right">
          <CircleButton tooltip="Add Task" onTouchTap={()=>addTask(plan._id)}>add</CircleButton>
          <CircleButton tooltip="Add Note">attach_file</CircleButton>
          <CircleButton tooltip="Archive" onTouchTap={()=>changePlanActiveValue(plan)}>folder_open</CircleButton>
          <IconMenu
            iconButtonElement={<CircleButton tooltip="Archive">more_horiz</CircleButton>}
          >
            <MenuItem primaryText="Delete Plan"/>
            <MenuItem primaryText="Add Multiple Tasks" onTouchTap={addBatchTasks}/>
          </IconMenu>
        </div>
        <AddTasksModal open={addingBatchTasks} onClose={stopAddBatchTasks} onSubmit={handleSaveBatchTasks}/>
      </div>
    );
  }
}
        
