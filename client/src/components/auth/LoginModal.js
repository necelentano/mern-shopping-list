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
import { login } from '../../actions/authActions';
import { clearErrors} from '../../actions/errorActions';

class LoginModal extends Component {

    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
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

        const {  email, password } = this.state;

        // Create user object
        const user = {
            email,
            password
        };
        // Attempt to login
        this.props.login(user);
    }

    render() {
        return(
            <Container>
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        { this.state.msg && <Alert color='danger'>{this.state.msg}</Alert>}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="text" name="email" id="email" placeholder="Email" className='mb-3' onChange={this.onChange}/>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password" className='mb-3' onChange={this.onChange}/>
                            </FormGroup>
                            <Button color="dark" block>Login</Button>
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

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);