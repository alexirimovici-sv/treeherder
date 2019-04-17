import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Container, Button } from 'reactstrap';

import SimpleTooltip from '../shared/SimpleTooltip';

import InputFilter from './InputFilter';

const FilterControls = ({
  dropdownOptions,
  filterOptions,
  updateFilterText,
  updateFilter,
}) => {
  const createButton = filter => (
    <Button
      color="info"
      outline
      onClick={() => updateFilter(filter.stateName)}
      active={filter.state}
    >
      {filter.text}
    </Button>
  );

  return (
    <Container fluid className="my-3 px-0">
      {dropdownOptions}
      <Row className="pb-3 pl-3 justify-content-left">
        <Col className="py-2 pl-0 pr-2 col-3">
          <InputFilter updateFilterText={updateFilterText} />
        </Col>
        {filterOptions.length > 0 &&
          filterOptions.map(filter => (
            <Col sm="auto" className="p-2" key={filter.stateName}>
              {filter.tooltipText ? (
                <SimpleTooltip
                  text={createButton(filter)}
                  tooltipText={filter.tooltipText}
                />
              ) : (
                createButton(filter)
              )}
            </Col>
          ))}
      </Row>
    </Container>
  );
};

FilterControls.propTypes = {
  dropdownOptions: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.bool]),
  filterOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateFilter: PropTypes.func.isRequired,
  updateFilterText: PropTypes.func.isRequired,
};

FilterControls.defaultProps = {
  dropdownOptions: null,
};

export default FilterControls;
