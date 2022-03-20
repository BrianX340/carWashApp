import React, { useEffect } from 'react';
import AuthService from "../services/AuthService";
import { Redirect } from "react-router-dom";

export default function LogoutView() {

	useEffect(() => {
		AuthService.logout()
	}, []);

	return (<Redirect to="/login" />)
}