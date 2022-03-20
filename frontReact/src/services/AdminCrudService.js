import axios from "axios";
class UserCrudService {
	createClient(clientName, clientWsp, vehicles){
		return axios({
			method: 'post',
			url: `http://localhost:3001/user/createOperation`,
			crossdomain: true,
			data: {
				clientName,
				clientWsp,
				vehicles,
				token: JSON.parse(localStorage.getItem('user')).token
			}
		})
			.then((res) => {
				const { status, user } = res.data;
				console.log(res.data)
				if (status === 'ok') {
					localStorage.setItem("user", user);
					return true
				}
				return false
			})
			.catch((error) => {
				console.log(error);
			})
	}
}
export default new UserCrudService();