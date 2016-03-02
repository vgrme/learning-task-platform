import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import update from 'react/lib/update';
import {tasksActions, plansActions} from 'redux/modules';
import {TaskRow, TaskDetail, Cover} from 'components';
import * as plansService from 'services/planService';
import DragSortItem from '../Common/DragSortItem';

@connect(
  state => ({
    currentPlanId: state.plans.currentPlanId,
    currentSectionId: state.plans.currentSectionId,
    tasks: state.tasks.list,
    filter: state.filters.task,
    newTask: state.tasks.newTask,
    saved: state.tasks.saved,
    searchText: state.tasks.searchText
  }),
  { ...tasksActions, ...plansActions })
export default class TasksList extends Component {
  static propTypes = {
    currentPlanId: PropTypes.string.isRequired,
    currentSectionId: PropTypes.string.isRequired,
    tasks: PropTypes.array,
    newTask: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      showTaskDetailIndex: -1,
      tempShowTask: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.saved && nextProps.saved){ // task saved
      nextProps.loadPlansPercentageInfo(nextProps.currentPlanId);
    }
    if(this.props.currentPlanId !== nextProps.currentPlanId){
      this.setState({
        showTaskDetailIndex: -1
      });
    }
  }

  render() {
    const {currentPlanId, currentSectionId, tasks, newTask, filter, searchText} = this.props;
    const {updateTaskName, updateTaskDescription, saveTaskName, saveTaskDescription, 
           changeTaskCompleteValue, reorderTask, saveAllTasks} = this.props; //from tasksActions
    const {showTaskDetailIndex, tempShowTask} = this.state;

    const handleSubmitName = (task) => {
      saveTaskName(task, tasks, currentSectionId, currentPlanId);
    };

    const handleSubmitDescription = (task) =>{
      saveTaskDescription(task, currentSectionId, currentPlanId);
    };

    const moveItem = (dragIndex, hoverIndex) => {
      const dragItem = tasks[dragIndex];

      var newTasks = update(tasks, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem]
          ]
        });

      this.setState({
        showTaskDetailIndex: -1
      });
      
      reorderTask(newTasks);
    };

    const saveTasksOrder = () => {
      const newTasksList = tasks.map((t, i) => {
        t.order = i+1;
        return t;
      });
      saveAllTasks(newTasksList, currentSectionId, currentPlanId, 'reorder');
    };

    const showTask = (task) => {
      var show = true;
      if(filter === 'Completed') {
        show = show && task.complete;
      }
      else if(filter === 'Incomplete')
        show = show && !task.complete;
      if(searchText){
        show = show && task.name.toLowerCase().indexOf(searchText.toLowerCase())!==-1;
      }
      return show;
    };

    const handleDetailBtnClick = (index) => {
      this.setState({
        showTaskDetailIndex: index === showTaskDetailIndex?-1:index
      });
    };

    const handleTaskCheckBoxClick = (task) => {
      this.setState({
        tempShowTask: {...tempShowTask, [task._id]: true}
      });
      setTimeout(()=>{
        this.setState({
          tempShowTask: {...tempShowTask, [task._id]: false}
        });
      }, 2000);
      changeTaskCompleteValue(task,currentSectionId,currentPlanId);
    };

    return (
      <div>
        <div>
          {
            !newTask?'':
            <TaskRow task={newTask} onNameChange={updateTaskName} autoFocus={true}
                     onSubmitName={()=>handleSubmitName(newTask)} />
          }
        </div>
        <div className="relative">
          {!newTask?'':<Cover />}
          {
            tasks.map((t, i) => 
            <div key={t._id}>
              {!showTask(t)&&!tempShowTask[t._id]?'':
                <div>
                  <DragSortItem type="task" index={i} id={t._id} dragHandle={true}
                                moveItem={moveItem} saveItems={saveTasksOrder}>
                    <TaskRow task={t} onNameChange={updateTaskName} onSubmitName={()=>handleSubmitName(t)}
                             onCheck={()=>handleTaskCheckBoxClick(t)}
                             onDetailBtnClick={()=>handleDetailBtnClick(i)}/>
                  </DragSortItem>
                  <TaskDetail task={t} onDescriptionChange={updateTaskDescription} show={i===showTaskDetailIndex}
                              onSubmitDescription={()=>handleSubmitDescription(t)} />
                </div>
              }
            </div>
           )
          }
        </div>
      </div>
    );
  }
}
