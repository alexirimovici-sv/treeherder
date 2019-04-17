import React from 'react';
import PropTypes from 'prop-types';
import { react2angular } from 'react2angular/index.es2015';
import { Alert, Container } from 'reactstrap';

import perf from '../../js/perf';

import AlertsViewControls from './AlertsViewControls';

// TODO remove $stateParams and $state after switching to react router
export class AlertsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user, $stateParams } = this.props;
    return (
      <Container fluid className="max-width-default">
        {!user.isStaff && (
          <Alert color="info">
            You must be logged into perfherder/treeherder and be a sheriff to
            make changes
          </Alert>
        )}
        <AlertsViewControls $stateParams={$stateParams} />
      </Container>
    );
  }
}

AlertsView.propTypes = {
  $stateParams: PropTypes.shape({}),
  $state: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
};

AlertsView.defaultProps = {
  $stateParams: null,
  $state: null,
};

perf.component(
  'alertsView',
  react2angular(AlertsView, ['user'], ['$stateParams', '$state']),
);

export default AlertsView;
