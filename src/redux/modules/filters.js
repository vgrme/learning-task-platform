const SET_FILTER = 'filter/SET_FILTER';

const initialState = {
  section: 'Active',
  plan: 'Active',
  task: 'Not Complete'
};

export const FILTER_OPTIONS = {
  section: ['All', 'Active', 'Not Active'],
  task: ['All', 'Complete', 'Not Complete']
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        [action.key]: action.value
      };
    default:
      return state;
  }
};


export const setFilter = (key, value) => {
  return {
    type: 'SET_FILTER',
    value,
    key
  };
};
