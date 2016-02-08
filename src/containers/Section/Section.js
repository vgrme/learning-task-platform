import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {plansActions, sectionsActions} from 'redux/modules';
import Container from '../App/Container';

@connect(
  state => ({
    //loaded: state.plans.loaded,
    //sections: state.plans,
    //filter: state.filter
  }),
  { ...plansActions, ...sectionsActions })
export default class Home extends Component {
  static propTypes = {
    loadPlans: PropTypes.func.isRequired,
    loadSections: PropTypes.func.isRequired
    //sections: PropTypes.array
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.loadPlans();
    this.props.loadSections();
  }

  render() {

    return (
      <Container className="clearfix">
        <div>Section</div>
      </Container>
    );
  }
}
