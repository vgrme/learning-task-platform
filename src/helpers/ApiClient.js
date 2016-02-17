import superagent from 'superagent';
import cookie from 'react-cookie';
import history from 'helpers/history';
//import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    //return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return adjustedPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        //const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NmJhNWJjY2VlNTc3ODJiNDk4MjA1MjYiLCJpYXQiOjE0NTU0MTg1ODEwNDMsImV4cCI6MTQ1NTQzNjU4MTA0M30.7W1HqjYGvxFfnKCRw0aQH8XfSa_t8v0n66KZ-NtQwaM";
        const token = cookie.load('token');
        if(token) request.set('Authorization', 'Bearer '+token);

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => {
          if(err){
            reject(body || err);
          }
          else resolve(body);
        });
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
