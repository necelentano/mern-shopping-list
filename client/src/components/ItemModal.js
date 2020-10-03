import React, { Component } from 'react';
import {
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {

    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        }
        /// Add Item to store via addItem action
        this.props.addItem(newItem);

        this.toggle();
    }

    render() {

        const { isAuthenticated } = this.props;

        const addButton = (
            <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}>
                    Add Item 
            </Button>
        )

        return(
            <Container>
                { isAuthenticated ? addButton : <h4 className="mb-3 ml-4">Please log in to manage items</h4> }
                
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input type="text" name="name" id="item" placeholder="Add shopping item" onChange={this.onChange}/>
                            </FormGroup>
                            <Button color="dark" block>Add Item</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </Container>   
        )
    }

}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addItem})(ItemModal);