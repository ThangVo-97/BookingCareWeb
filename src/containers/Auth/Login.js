import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { handleLogin } from '../../services/userService';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isHidePassword: true
        }
    }
    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleLogin = async() => {
        const { username, password } = this.state
        try {
            const result = await handleLogin(username, password)
            console.log("My results: ", result)
        } catch (error) {
            console.log("My error: ", error)
        }
        
        
    }

    handleShowPassword = () => {
        this.setState({
            isHidePassword: !this.state.isHidePassword
        })
    }
    render() {
        const { username, password, isHidePassword } = this.state
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group input-login'>
                            <label>Username: </label>
                            <input type='text' className='form-control'
                                placeholder='Enter your username' value={username}
                                onChange={(e) => { this.handleOnChangeUsername(e) }}
                            />
                        </div>

                        <div className='col-12 form-group input-login'>
                            <label>Password: </label>
                            <div className='custom-input-password'>
                                <input
                                    type={isHidePassword ? 'password' : 'text'}
                                    className='form-control'
                                    placeholder='Enter your password' value={password}
                                    onChange={(e) => { this.handleOnChangePassword(e) }}

                                />
                                <span
                                    onClick={() => {
                                        this.handleShowPassword()
                                    }}>
                                    {
                                        isHidePassword ?
                                            <i class="fas fa-eye-slash icon-eye"></i> :
                                            <i class="fas fa-eye icon-eye"></i>
                                    }
                                </span>
                            </div>
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>

                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i class="fab fa-google-plus-g icon-google"></i>
                            <i class="fab fa-facebook icon-facebook" ></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
