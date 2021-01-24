// frontend/src/components/Modal.js

import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }
    handleDNAChange = e => {
        const activeItem = { ...this.state.activeItem, [e.target.name]: e.target.value.toUpperCase() };
        this.setState({ activeItem });
    };
    handleRerunChange = e => {
        const activeItem = { ...this.state.activeItem, [e.target.name]: e.target.checked };
        this.setState({ activeItem });
    };
    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}> Match New Sequence </ModalHeader>
            <ModalBody>
                <Form>
                <FormGroup>
                    <Label for="dnasequence">DNA Sequence</Label>
                    <Input
                        type="text"
                        name="dnasequence"
                        value={this.state.activeItem.dnasequence}
                        onChange={this.handleDNAChange}
                        placeholder="Enter DNA Sequence"
                    />
                </FormGroup>
                <FormGroup check>
                    <Label for="forcererun">
                    <Input
                        type="checkbox"
                        name="forcererun"
                        checked={this.state.activeItem.forcererun}
                        onChange={this.handleRerunChange}
                    />
                    Force Rerun
                    </Label>
                </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                Find Matching Protein
                </Button>
            </ModalFooter>
            </Modal>
        );
    }
}