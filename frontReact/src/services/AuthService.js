import axios from "axios";
const API_URL = "http://localhost:3001/";
class AuthService {
	login(email, password) {
		return axios({
			method: 'post',
			url: `http://localhost:3001/login`,
			crossdomain: true,
			data: {
				email,
				password
			}
		})
			.then((res) => {
				const { status } = res.data;
				if (status === 'ok') {
					localStorage.setItem("user", res.data.user);
					return true
				}
				return false
			})
			.catch((error) => {
				console.log(error);
			})
	}
	logout() {
		localStorage.removeItem("user");
	}
	register(email, password) {
		return axios({
			method: 'post',
			url: API_URL + `register`,
			data: {
				email,
				password
			}
		})
			.then((res) => {
				const { status } = res.data;
				return status === 'ok'
			})
			.catch((error) => {
				console.log(error);
			})
	}
	getCurrentUser() {
		return localStorage.getItem('user');
	}
}
export default new AuthService();