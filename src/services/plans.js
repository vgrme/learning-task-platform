import _ from 'lodash';

const sections = [
  {id: 1, name: 'Programming', active: true, order: 1 },
  {id: 2, name: 'Piano', active: true, order: 2 },
  {id: 3, name: 'Future', active: false, order: 3 },
  {id: 4, name: 'Other', active: true, order: 4}
];

var plans = [
  {id: 1, name: 'React', active: true, section: 1, order: 2 },
  {id: 2, name: 'Angular2', active: true, section: 1, order: 3 },
  {id: 3, name: 'Angular1', active: false, section: 1, order: 1 },
  {id: 4, name: 'Spanish', active: false, section: 4, order: 2 },
  {id: 5, name: 'Reading', active: true, section: 4, order: 1 },
  {id: 6, name: 'Hanan', active: true, section: 2, order: 2 },
  {id: 7, name: 'Thompson', active: true, section: 2, order: 1 },
  {id: 8, name: 'Cooking', active: false, section: 3, order: 1 }
];

const tasks = [
];

export function getPlans(){
  return plans;
}

export function getSections(){
  return sections;
}


export function getGroupedPlans(plans, sections){

  var plansGroup = _.groupBy(plans, 'section');
  
  var orderedPlans = _.chain(sections)
                         .orderBy(['order'])
                         .map((section)=>{
                            var result = {};
                            result.section = section;
                            result.plans = _.orderBy(plansGroup[section.id],['order']);
                            return result;
                          })
                         .value();
  return orderedPlans;
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