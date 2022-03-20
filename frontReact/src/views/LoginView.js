import React, { Component } from 'react'
import AuthService from "../services/AuthService";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: "",
            password: "",
            loading: false,
            message: "",
            showLogedError: false,
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
            showLogedError: false
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
            showLogedError: false
        });
    }

    handleLogin(e) {
        e.preventDefault();
        AuthService.login(this.state.email, this.state.password)
            .then((loged) => {
                if (!loged) {
                    this.setState({ showLogedError: true })
                    return
                }
                this.props.history.push("/");
                window.location.reload();
            });
    }

    render() {
        return (
            <>
                <section className="hero is-fullheight">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                    <form onSubmit={this.handleLogin} className="box">
                                        <div className="field">
                                            <label htmlFor="" className="label">Email</label>
                                            <div className="control has-icons-left">
                                                <input onChange={this.onChangeEmail} type="email" placeholder="asd@example.com" className="input" required />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-envelope"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label htmlFor="" className="label">Password</label>
                                            <div className="control has-icons-left">
                                                <input onChange={this.onChangePassword} type="password" placeholder="*******" className="input" required />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-lock"></i>
                                                </span>
                                            </div>
                                            {(this.state.showLogedError) ?
                                                <span className="help is-danger">Error email o contraseña invalidos.</span>
                                                : ''}
                                        </div>
                                        <div className='buttons'>
											<button type='submit' className="button mt-1 is-fullwidth is-primary">
                                                Iniciar Sesion
											</button>
										</div>
                                        <small>
											<span className='has-text-centered is-block'>
												No tienes una cuenta?
											</span>
											<a href="/register" className="has-text-centered is-block"> Registrarme</a>
										</small>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}