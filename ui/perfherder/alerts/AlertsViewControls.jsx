import React from 'react';
// import PropTypes from 'prop-types';
// import { Col, Row, Container, Button } from 'reactstrap';

// import SimpleTooltip from '../../shared/SimpleTooltip';
import FilterControls from '../FilterControls';
import { convertParams } from '../helpers';

export default class AlertsViewControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideImprovements: convertParams(
        this.props.$stateParams,
        'hideImprovements',
      ),
      hideDownstream: convertParams(this.props.$stateParams, 'hideDownstream'),
      filterText: '',
    };
  }

  // componentDidMount() {
  //   this.updateFilteredResults();
  // }

  // componentDidUpdate(prevProps) {
  //   const { compareResults } = this.props;
  //   if (prevProps.compareResults !== compareResults) {
  //     this.updateFilteredResults();
  //   }
  // }

  // updateFilterText = filterText => {
  //   this.setState({ filterText }, () => this.updateFilteredResults());
  // };

  // updateFilter = filter => {
  //   this.setState(
  //     prevState => ({ [filter]: !prevState[filter] }),
  //     () => this.updateFilteredResults(),
  //   );
  // };

  // filterResult = (testName, result) => {
  //   const {
  //     filterText,
  //     showImportant,
  //     hideUncertain,
  //     showNoise,
  //     hideUncomparable,
  //   } = this.state;

  //   const matchesFilters =
  //     (!showImportant || result.isMeaningful) &&
  //     (!hideUncomparable || 'newIsBetter' in result) &&
  //     (!hideUncertain || result.isConfident) &&
  //     (!showNoise || result.isNoiseMetric);

  //   if (!filterText) return matchesFilters;

  //   const words = filterText
  //     .split(' ')
  //     .map(word => `(?=.*${word})`)
  //     .join('');
  //   const regex = RegExp(words, 'gi');
  //   const text = `${testName} ${result.name}`;

  //   // searching with filter input and one or more metricFilter buttons on
  //   // will produce different results compared to when all filters are off
  //   return regex.test(text) && matchesFilters;
  // };

  // updateFilteredResults = () => {
  //   const {
  //     filterText,
  //     hideUncomparable,
  //     showImportant,
  //     hideUncertain,
  //     showNoise,
  //   } = this.state;

  //   const { compareResults } = this.props;

  //   if (
  //     !filterText &&
  //     !hideUncomparable &&
  //     !showImportant &&
  //     !hideUncertain &&
  //     !showNoise
  //   ) {
  //     return this.setState({ results: compareResults });
  //   }

  //   const filteredResults = new Map(compareResults);

  //   for (const [testName, values] of filteredResults) {
  //     const filteredValues = values.filter(result =>
  //       this.filterResult(testName, result),
  //     );

  //     if (filteredValues.length) {
  //       filteredResults.set(testName, filteredValues);
  //     } else {
  //       filteredResults.delete(testName);
  //     }
  //   }
  //   this.setState({ results: filteredResults });
  // };

  render() {
    const { hideImprovements, hideDownstream } = this.state;
    const alertFilters = [
      {
        text: 'Hide improvements',
        state: hideImprovements,
        stateName: 'hideImprovements',
      },
      {
        text: 'Hide downstream / reassigned to / invalid',
        state: hideDownstream,
        stateName: 'hideDownstream',
      },
    ];

    // <span ng-if="!alertId" ng-cloak class="alert-selects d-flex">
    // <div class="form-group">
    //   <select ng-model="filterOptions.status"
    //           ng-options="status.text for status in statuses track by status.id"
    //           ng-change="filtersUpdated()"/>
    // </div>
    // &nbsp;
    // <div class="form-group">
    //   <select ng-model="filterOptions.framework"
    //           ng-options="framework.name for framework in frameworks track by framework.id"
    //           ng-change="filtersUpdated()"/>
    // </div>

    return (
      <FilterControls
        filterOptions={alertFilters}
        updateFilter={() => {}}
        updateFilterText={() => {}}
        // dropdownOptions={
        //   <Col sm="auto" className="py-0 pl-0 pr-3">
        //   <UncontrolledDropdown className="mr-0 text-nowrap">
        //     <DropdownToggle caret>{framework.name}</DropdownToggle>
        //     {frameworkNames && (
        //       <DropdownMenuItems
        //         options={frameworkNames}
        //         selectedItem={framework.name}
        //         updateData={this.updateFramework}
        //       />
        //     )}
        //   </UncontrolledDropdown>
        // </Col>

        // }
      />
    );
  }
}

// AlertsView.propTypes = {
//   compareResults: PropTypes.shape({}).isRequired,
//   frameworkOptions: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.bool]),
//   dateRangeOptions: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.bool]),
//   validated: PropTypes.shape({
//     showOnlyImportant: PropTypes.string,
//     showOnlyComparable: PropTypes.string,
//     showOnlyConfident: PropTypes.string,
//     showOnlyNoise: PropTypes.string,
//   }),
//   showTestsWithNoise: PropTypes.oneOfType([
//     PropTypes.shape({}),
//     PropTypes.bool,
//   ]),
// };

// AlertsViewControls.defaultProps = {
//   frameworkOptions: null,
//   dateRangeOptions: null,
//   validated: {
//     showOnlyImportant: undefined,
//     showOnlyComparable: undefined,
//     showOnlyConfident: undefined,
//     showOnlyNoise: undefined,
//   },
//   showTestsWithNoise: null,
// };
