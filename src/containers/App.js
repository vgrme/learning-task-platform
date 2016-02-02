import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';


@connect(
  state => ({}),
  { pushState })
export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {

    return (
      <div>
        <div>App</div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

// App.propTypes = {
  // children: PropTypes.object.isRequired
  // actions: PropTypes.object.isRequired,
  // fuelSavingsAppState: PropTypes.object.isRequired
// };

// function mapStateToProps(state) {
//   return {
//     fuelSavingsAppState: state.fuelSavingsAppState
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(FuelSavingsActions, dispatch)
//   };
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);
