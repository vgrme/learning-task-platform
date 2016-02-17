import _ from 'lodash';

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

export function addTasks(tasks, newTasks){
  var newList = newTasks.concat(tasks);
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

export function findAndRemoveById(array, id){
  return _.remove(array, x => x._id!==id);
}

export function replacePlansBySection(plans, sectionId, newPlans){
  return newPlans.concat(_.filter(plans, (p)=>p.sectionId!==sectionId));
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

export function generateBatchTasks(mainName, number, planId){
  return _.chain(number)
          .range()
          .map(n=>{return {name: `${mainName} ${n+1}`, planId}; })
          .value();
}
