import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import update from 'react/lib/update';
import {plansActions} from 'redux/modules';
import {PlanRow} from 'components';
import DragSortItem from '../Common/DragSortItem';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@connect(
  state => ({
    newPlan: state.plans.newPlan,
    percentageInfo: state.plans.percentageInfo
  }),
  {...plansActions })
export default class PlansList extends Component {
  static propTypes = {
    plans: PropTypes.array,
    sectionId: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    updatePlanName: PropTypes.func.isRequired,
    selectPlan: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      plans: this.props.plans
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      plans: nextProps.plans
    });
  }

  render() {
    const {plans, sectionId, filter, newPlan, percentageInfo} = this.props;
    const {savePlanName, selectPlan, updatePlanName, saveAllPlans} = this.props;  //from plansActions

    const moveItem = (dragIndex, hoverIndex) => {
      const { plans } = this.state;
      const dragPlan = plans[dragIndex];

      this.setState(update(this.state, {
        plans: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragPlan]
          ]
        }
      }));
    };

    const savePlansOrder = () => {
      const { plans } = this.state;
      const newPlansList = plans.map((t, i) => {
        t.order = i+1;
        return t;
      });
      saveAllPlans(newPlansList, sectionId, 'reorder');
    };

    const showPlan = (plan) => {
      if(filter === 'All') return true;
      else if(filter === 'Active') return plan.active;
      else return !plan.active;
    };

    return (
      <div>
        <div>
          {
            !newPlan || newPlan.sectionId!==sectionId?'':
            <PlanRow plan={newPlan} onTextChange={updatePlanName} autoFocus={true}
                        onTextBlur={()=>savePlanName(newPlan, plans)} />
          }
        </div>
        <div>
          {this.state.plans.map((p, i) => 
            <div key={p._id}>
              {!showPlan(p)?'':
                <DragSortItem type={"plan"+sectionId} index={i} id={p._id} moveItem={moveItem} saveItems={savePlansOrder}>
                  <PlanRow key={p._id} plan={p} percentage={percentageInfo[p._id]} onTextChange={updatePlanName} 
                           onPlanClick={selectPlan} onTextBlur={()=>savePlanName(p, plans)} />
                </DragSortItem>
              }
            </div>
           )
          }
        </div>
      </div>
    );
  }

}