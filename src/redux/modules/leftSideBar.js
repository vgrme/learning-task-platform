const OPEN_LEFT_NAV = 'leftSideBar/OPEN_LEFT_NAV';
const CLOSE_LEFT_NAV = 'leftSideBar/CLOSE_LEFT_NAV';

const initialState = true;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_LEFT_NAV':
      return true;
    case 'CLOSE_LEFT_NAV':
      return false;
    default:
      return state;
  }
};


export const openLeftNav = () => {
  return {
    type: 'OPEN_LEFT_NAV'
  };
};

export const closeLeftNav = () => {
  return {
    type: 'CLOSE_LEFT_NAV'
  };
};
