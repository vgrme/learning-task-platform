import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {plansActions, tasksActions, filterActions} from 'redux/modules';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {CircleButton, AddTasksModal, SearchBar, DropDownFilter} from 'components';
import Filter from './Filter';

@connect(
  state => ({
    currentPlanId: state.plans.currentPlanId,
    currentSectionId: state.plans.currentSectionId,
    tasks: state.tasks.list,
    addingBatchTasks: state.tasks.addingBatchTasks,
    filters: state.filters,
    searchText: state.tasks.searchText
  }),
  { ...plansActions, ...tasksActions, ...filterActions })
export default class PlanActionBar extends Component {
  static propTypes = {
    plan: PropTypes.object.isRequired,
    changePlanActiveValue: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired
  };

  render() {
    const {plan, tasks, filters, searchText, currentPlanId, currentSectionId, addingBatchTasks} = this.props;
    const {setFilter, changePlanActiveValue, deletePlan, addTask, addBatchTasks, 
           stopAddBatchTasks, saveBatchTasks, updateSearchText} = this.props;  //from actions

    const archiveLabel = plan.active? 'Archive': 'UnArchive';

    const handleSaveBatchTasks = (mainName, number) =>{
      saveBatchTasks(mainName, number, tasks, currentSectionId, currentPlanId);
    };

    const handleFilterChange = (value) => {
      setFilter('task', value);
    };

    return (
      <div className="clearfix">
        <div className="float-left">
          <CircleButton tooltip="Add Task" onTouchTap={()=>addTask(plan._id)}>add</CircleButton>
          <CircleButton tooltip="Add Note">attach_file</CircleButton>
          <CircleButton tooltip="Archive" onTouchTap={()=>changePlanActiveValue(plan)}>folder_open</CircleButton>
          <IconMenu
            iconButtonElement={<CircleButton tooltip="Archive">more_horiz</CircleButton>}
          >
            <MenuItem primaryText="Delete Plan" onTouchTap={()=>deletePlan(plan._id, currentSectionId)}/>
            <MenuItem primaryText="Add Multiple Tasks" onTouchTap={addBatchTasks}/>
          </IconMenu>
        </div>
        <div className="float-left">
          <SearchBar onSearchTextChange={updateSearchText} text={searchText}/>
        </div>
        <div className="float-right">
          <DropDownFilter filterOptions={filterActions.FILTER_OPTIONS['task']} filter={filters['task']} 
                          onFilterChange={handleFilterChange} style={{marginTop: 14}}/>
        </div>
        <AddTasksModal open={addingBatchTasks} onClose={stopAddBatchTasks} onSubmit={handleSaveBatchTasks}/>
      </div>
    );
  }
}
        
