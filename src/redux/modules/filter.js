const SET_FILTER = 'filter/SET_FILTER';

export default (state = 'All', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};


export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter: filter
  };
};
