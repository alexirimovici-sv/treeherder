import React from 'react';
import PropTypes from 'prop-types';
import { react2angular } from 'react2angular/index.es2015';
import { Alert, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import perf from '../../js/perf';
import withValidation from '../Validation';
import { convertParams, getFrameworkData, getStatus, processResponse } from '../helpers';
import { alertSummaryStatus, endpoints } from '../constants';
import { createQueryParams, getApiUrl } from '../../helpers/url';
import { getData } from '../../helpers/http';
import ErrorMessages from '../../shared/ErrorMessages';

import AlertsViewControls from './AlertsViewControls';
import AlertTable from './AlertTable';

// TODO remove $stateParams and $state after switching to react router
export class AlertsView extends React.Component {
  constructor(props) {
    super(props);
    this.validated = this.props.validated;
    this.state = {
      status: this.getDefaultStatus(),
      framework: getFrameworkData(this.validated),
      page: this.validated.page ? parseInt(this.validated.page, 10) : 1,
      errorMessages: [],
      alertSummaries: {},
      issueTrackers: [],
      loading: true,
    };
  }


  // TODO need to add alert validation to Validation component
  // if ($stateParams.id) {
  //   $scope.alertId = $stateParams.id;
  //   getAlertSummary($stateParams.id).then(
  //       function (data) {
  //           addAlertSummaries([data], null);
  //       });
  componentDidMount() {
    this.fetchAlertSummaries();
  }
  // TODO send data to tableControls to filter summaries

  getDefaultStatus = () => {
    const { validated } = this.props;
    const statusParam = convertParams(validated, 'status');
    if (!statusParam) {
      return Object.keys(alertSummaryStatus)[1];
    }
    return getStatus(parseInt(validated.status, 10));
  };

  updateFramework = selection => {
    const { frameworks, updateParams } = this.props.validated;
    const framework = frameworks.find(item => item.name === selection);

    updateParams({ framework: framework.id });
    // TODO fetch new data
    this.setState({ framework });
  };

  updateStatus = status => {
    const statusId = alertSummaryStatus[status];
    this.props.validated.updateParams({ status: statusId });
    // TODO fetch new data, use statusId as param
    this.setState({ status });
  };

  // export const AlertSummary = async (alertSummaryData, optionCollectionMap) => {
  //   if (issueTrackers === undefined) {
  //     return getData(getApiUrl(endpoints.issueTrackers)).then(
  //       ({ data: issueTrackerList }) => {
  //         issueTrackers = issueTrackerList;
  //         return constructAlertSummary(
  //           alertSummaryData,
  //           optionCollectionMap,
  //           issueTrackers,
  //         );
  //       },
  //     );
  //   }
  async fetchAlertSummaries() {
    const { framework, status, page, errorMessages } = this.state;

    const url = getApiUrl(
      `${endpoints.alertSummary}${createQueryParams({
        framework: framework.id,
        status: alertSummaryStatus[status],
        page,
      })}`,
    );
    const [alertSummaries, issueTrackers] = await Promise.all([getData(url), getData(getApiUrl(endpoints.issueTrackers))]);
    const updates = {
      loading: false,
      ...processResponse(alertSummaries, 'alertSummaries', errorMessages),
      ...processResponse(issueTrackers, 'issueTrackers', errorMessages),
    };

    this.setState(updates);
  }
// TODO - optioncollection map data is needed and after alertSummaries is received
// we need to construct a special title for each alert - do this in the AlertsTable.
  // const alertSummaries = constructAlertSummary(
  //   alertSummaryData,
  //   optionCollectionMap,
  //   issueTrackers,
  // );

  render() {
    const { user, validated } = this.props;
    const { framework, status, errorMessages, loading, alertSummaries } = this.state;
    const { frameworks, projects } = validated;

    const frameworkNames =
      frameworks && frameworks.length ? frameworks.map(item => item.name) : [];

    const alertDropdowns = [
      {
        options: Object.keys(alertSummaryStatus),
        selectedItem: status,
        updateData: this.updateStatus,
      },
      {
        options: frameworkNames,
        selectedItem: framework.name,
        updateData: this.updateFramework,
      },
    ];

    return (
      <Container fluid className="max-width-default">
        {loading && (
          <div className="loading">
            <FontAwesomeIcon
              icon={faCog}
              size="4x"
              spin
              title="loading page, please wait"
            />
          </div>
        )}

        {errorMessages.length > 0 && (
          <Container className="pt-5 max-width-default">
            <ErrorMessages errorMessages={errorMessages} />
          </Container>
        )}

        {!user.isStaff && (
          <Alert color="info">
            You must be logged into perfherder/treeherder and be a sheriff to
            make changes
          </Alert>
        )}
        <AlertsViewControls {...this.props} dropdownOptions={alertDropdowns} />
        {Object.keys(alertSummaries).length > 0 &&
          alertSummaries.results.map(alertSummary => (
            <AlertTable
              key={alertSummary.id}
              alertSummary={alertSummary}
              user={user}
              repos={projects}
              alertSummaries={alertSummaries}
            />
          ))}
      </Container>
    );
  }
}

AlertsView.propTypes = {
  $stateParams: PropTypes.shape({}),
  $state: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  validated: PropTypes.shape({
    projects: PropTypes.arrayOf(PropTypes.shape({})),
    frameworks: PropTypes.arrayOf(PropTypes.shape({})),
    updateParams: PropTypes.func.isRequired,
    framework: PropTypes.string,
  }).isRequired,
};

AlertsView.defaultProps = {
  $stateParams: null,
  $state: null,
};

const alertsView = withValidation(new Set([]), false)(AlertsView);

perf.component(
  'alertsView',
  react2angular(alertsView, ['user'], ['$stateParams', '$state']),
);

export default alertsView;
