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
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors} from '../../actions/errorActions';

class RegisterModal extends Component {

    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({msg: error.msg.msg});
            } else {
                this.setState({msg: null});
            }
        }
        // If authenticated, close modal
        if (this.state.modal) {
            if (this.props.isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        // Create user object
        const newUser = {
            name,
            email,
            password
        };
        // Attempt to register
        this.props.register(newUser);
    }

    render() {
        return(
            <Container>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg && <Alert color='danger'>{this.state.msg}</Alert>}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" placeholder="Name" className='mb-3' onChange={this.onChange}/>
                                <Label for="email">Email</Label>
                                <Input type="text" name="email" id="email" placeholder="Email" className='mb-3' onChange={this.onChange}/>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password" className='mb-3' onChange={this.onChange}/>
                            </FormGroup>
                            <Button color="dark" block>Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </Container>   
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);