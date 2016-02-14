import {authActions} from 'redux/modules';

export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      return promise(client).then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => {
          if(error.status === 401){
            //history.replaceState(null, '/login');
            return next(authActions.logout());
          }
          next({...rest, error, type: FAILURE});
        }
      ).catch((error)=> {
        //console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });
    };
  };
}
