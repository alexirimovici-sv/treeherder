import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import { update } from '../../helpers/http';
import { getApiUrl } from '../../helpers/url';
import { endpoints } from '../constants';

export default class NotesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.alertSummary.notes,
    };
  }

  updateInput = event => {
    this.setState({ inputValue: event.target.value });
  };

  // TODO remove this in favor of updateAndClose in StatusDropdown
  // once this component is using/updating the alertSummary via react state
  editNotes = async event => {
    event.preventDefault();

    const { alertSummary, toggle, updateState } = this.props;
    const { inputValue } = this.state;

    await update(getApiUrl(`${endpoints.alertSummary}${alertSummary.id}/`), {
      notes: inputValue,
    });

    alertSummary.notes = inputValue;
    updateState({ alertSummary });
    toggle();
  };

  render() {
    const { showModal, toggle, alertSummary } = this.props;
    const { inputValue } = this.state;

    return (
      <Modal isOpen={showModal} className="">
        <ModalHeader toggle={toggle}>Alert Notes</ModalHeader>
        <Form>
          <ModalBody>
            <FormGroup>
              <Label for="editableNotes">Add or edit notes</Label>
              <Input
                value={inputValue || ''}
                onChange={this.updateInput}
                name="editableNotes"
                type="textarea"
                cols="50"
                rows="10"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={this.editNotes}
              disabled={inputValue === alertSummary.notes}
              type="submit"
            >
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

NotesModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  alertSummary: PropTypes.shape({
    notes: PropTypes.string,
  }).isRequired,
  updateState: PropTypes.func.isRequired,
};
