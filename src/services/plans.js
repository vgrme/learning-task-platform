import _ from 'lodash';

const plans = [
  {id: 1, name: 'Programming', active: true, percentageComplete: 80, parent: null, tasks: []},
  {id: 2, name: 'React', active: true, percentageComplete: 50, parent: 1, tasks: []},
  {id: 3, name: 'Angular2', active: true, percentageComplete: 30, parent: 1, tasks: []},
  {id: 4, name: 'Angular1', active: false, percentageComplete: 100, parent: 1, tasks: []},
  {id: 5, name: 'Spanish', active: false, percentageComplete: 100, parent: null, tasks: []},
  {id: 6, name: 'Piano', active: true, percentageComplete: 50, parent: null, tasks: []},
  {id: 7, name: 'Reading', active: true, percentageComplete: 50, parent: null, tasks: []},
  {id: 8, name: 'Future', active: false, percentageComplete: 0, parent: null, tasks: []}
];

const tasks = [
];

export function getNestedPlans(condition) {
  var groupBy = _.groupBy(plans, 'parent');
  return groupBy;
}

export function getPlans(){
  return plans;
}

/*function g({name: x}) {
  console.log(x);
}
g({name: 5})*/