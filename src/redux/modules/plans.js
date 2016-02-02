import * as plansService from '../../services/plans';


const LOAD = 'plans/LOAD';
const LOAD_SUCCESS = 'plans/LOAD_SUCCESS';
const LOAD_FAIL = 'plans/LOAD_FAIL';


const initialState = {
  loaded: false,
  filter: 'All',
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        data: plansService.getPlans()
      };
    default:
      return state;
  }
}

export function loadPlans(){
  return {
    type: LOAD
  };
}