import React, { Component } from 'react'
import AuthService from "../services/AuthService";

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeRePassword = this.onChangeRePassword.bind(this);

		this.state = {
			email: "",
			password: "",
			repassword: "",
			successful: false,
			emailValidation: true,
			passwordValidation: true,
			repasswordValidation: true,
			passwordControl: false,
			validationSubmit: false
		};
	}

	regexEmail(email){
		//eslint-disable-next-line
		let regexEmail = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return regexEmail.test(email)
	}

	regexPassword(pass){
		//eslint-disable-next-line
		let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
        return regexPassword.test(pass)
	}

	onChangeEmail(e) {
		this.setState({validationSubmit: false})
		this.setState({email: e.target.value});
		this.setState({emailValidation: this.regexEmail(e.target.value) });
	}

	onChangePassword(e) {
		this.setState({validationSubmit: false})
		this.setState({password: e.target.value});
		this.setState(
			{
				passwordValidation: this.regexPassword(e.target.value),
				passwordControl: !this.regexPassword(e.target.value)
			}
		);
	}

	onChangeRePassword(e) {
		this.setState({validationSubmit: false})
		this.setState({repassword: e.target.value});
		this.setState({repasswordValidation: this.regexPassword(e.target.value) })
	}

	validateAllRegister(){
		let vEmail = this.regexEmail(this.state.email)
		let vPass = this.regexPassword(this.state.password)
		let vPass2 = this.state.password === this.state.repassword
		return vEmail === vPass === vPass2
	}

	handleRegister(e) {
		e.preventDefault();

		if(!this.validateAllRegister()){
			this.setState({validationSubmit: true})
			return
		}
		return AuthService.register(this.state.email, this.state.password)
			.then(sucess => {
				if (!sucess) {
					return false
				}
				this.props.history.push("/login");
				window.location.reload();
			})
	}

	render() {
		return (
			<>
				<section className="hero is-fullheight">
					<div className="hero-body">
						<div className="container">
							<div className="columns is-centered">
								<div className="column is-5-tablet is-4-desktop is-3-widescreen">
									<form onSubmit={this.handleRegister} className="box">
										<div className="field">
											<label htmlFor="" className="label">Email</label>
											<div className="control has-icons-left">
												<input className={this.state.emailValidation ? "input is-success" : "input is-danger"} onChange={this.onChangeEmail} type="email" placeholder="asd@example.com" required />
												<span className="icon is-small is-left">
													<i className="fa fa-envelope"></i>
												</span>
											</div>
										</div>
										<div className="field">
											<label htmlFor="" className="label">Password</label>
											<div className="control has-icons-left">
												<input className={this.state.passwordValidation ? "input is-success" : "input is-danger"} onChange={this.onChangePassword} type="password" placeholder="*******" required />
												<span className="icon is-small is-left">
													<i className="fa fa-lock"></i>
												</span>
											</div>
										</div>
										<div className="field">
											<label htmlFor="" className="label">Verificar Password</label>
											<div className="control has-icons-left">
												<input className={this.state.repasswordValidation ? "input is-success" : "input is-danger"} onChange={this.onChangeRePassword} type="password" placeholder="*******" required />
												<span className="icon is-small is-left">
													<i className="fa fa-lock"></i>
												</span>
											</div>
										</div>
										{(this.state.passwordControl) ?
                                                <span className="help is-danger">La contraseña debe contener al menos 8 caracteres, mayusculas, minusculas, numeros y un caracter especial.</span>
                                                : ''}
										{(this.state.validationSubmit) ?
                                                <span className="help is-danger">Verifique los datos ingresados.</span>
                                                : ''}
										<div className='buttons'>
											<button type='submit' className="button mt-1 is-fullwidth is-primary">
												Registrarme
											</button>
										</div>
										<small>
											<span className='has-text-centered is-block'>
												Ya tienes una cuenta?
											</span>
											<a href="/login" className="has-text-centered is-block"> inicia sesion aqui</a>
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