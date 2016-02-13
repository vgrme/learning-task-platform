import _ from 'lodash';

// const sections = [
//   {id: 1, name: 'Programming', active: true, order: 1 },
//   {id: 2, name: 'Piano', active: true, order: 2 },
//   {id: 3, name: 'Future', active: false, order: 3 },
//   {id: 4, name: 'Other', active: true, order: 4}
// ];

// var plans = [
//   {id: 1, name: 'React', active: true, section: 1, order: 2 },
//   {id: 2, name: 'Angular2', active: true, section: 1, order: 3 },
//   {id: 3, name: 'Angular1', active: false, section: 1, order: 1 },
//   {id: 4, name: 'Spanish', active: false, section: 4, order: 2 },
//   {id: 5, name: 'Reading', active: true, section: 4, order: 1 },
//   {id: 6, name: 'Hanan', active: true, section: 2, order: 2 },
//   {id: 7, name: 'Thompson', active: true, section: 2, order: 1 },
//   {id: 8, name: 'Cooking', active: false, section: 3, order: 1 }
// ];

// const tasks = [
//   {id: 1, name: 'R1', complete: true, plan: 1, order: 4 },
//   {id: 2, name: 'R2', complete: false, plan: 1, order: 2 },
//   {id: 3, name: 'R3', complete: true, plan: 1, order: 1 },
//   {id: 4, name: 'R4', complete: false, plan: 1, order: 3 },
//   {id: 5, name: 'A1', complete: false, plan: 2, order: 1 },
//   {id: 6, name: 'A2', complete: false, plan: 2, order: 2 },
//   {id: 7, name: 'A3', complete: false, plan: 2, order: 4 },
//   {id: 8, name: 'A4', complete: false, plan: 2, order: 3 }
// ];


export function getOrderedArray(array){
  return _.orderBy(array, ['order']);
}

export function addSection(sections, section){
  var newList = [section].concat(sections);
  return _.map(newList, function(item, i){
    item.order = i+1;
    return item;
  });
}

export function addTask(tasks, task){
  var newList = [task].concat(tasks);
  return _.map(newList, function(item, i){
    item.order = i+1;
    return item;
  });
}

export function addPlan(plans, sectionId, plan){
  var newList = [plan].concat(_.filter(plans, {sectionId: sectionId}));
  return _.map(newList, function(item, i){
    item.order = i+1;
    return item;
  });
}

export function findAndReplaceById(array, item){
  return array.map(x=> x._id===item._id? item:x );
}

export function replacePlansBySection(plans, sectionId, newPlans){
  return newPlans.concat(_.filter(plans, (p)=>p.sectionId!==sectionId));
}

export function getOrderedTasksByPlanId(tasks){
  return _.orderBy(tasks, ['order']);
}


export function getGroupedPlans(plans, sections){

  var plansGroup = _.groupBy(plans, 'sectionId');
  
  var orderedPlans = _.chain(sections)
                         .orderBy(['order'])
                         .map((section)=>{
                            var result = {};
                            result.section = section;
                            result.plans = _.orderBy(plansGroup[section._id],['order']);
                            return result;
                          })
                         .value();
  return orderedPlans;
}

export function getCurrentPlan(plans){
  return _.find(plans, {isCurrent: true});
}

export function getTasksByPlanId(){
  return [];
}

// export function updatePlanName(planId, planName){
//   var index = _.findIndex(plans, {id: planId});
//   plans[index].name = planName;
//   return getPlansSections();
// }

/*function g({name: x}) {
  console.log(x);
}
g({name: 5})*/