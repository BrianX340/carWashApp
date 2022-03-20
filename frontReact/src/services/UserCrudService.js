import axios from "axios";
class UserCrudService {
	createOperation(concept, amount, date, type) {
		return axios({
			method: 'post',
			url: `http://localhost:3001/user/createOperation`,
			crossdomain: true,
			data: {
				concept,
				amount,
				date,
				type,
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
	deleteOperation(operationId) {
		return axios({
			method: 'post',
			url: `http://localhost:3001/user/deleteOperation`,
			crossdomain: true,
			data: {
				operationId,
				token: JSON.parse(localStorage.getItem('user')).token
			}
		})
			.then((res) => {
				const { status, user } = res.data;
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
	updateOperation(operationId, modifyConcept, modifyAmount, modifyDate) {
		return axios({
			method: 'post',
			url: `http://localhost:3001/user/updateOperation`,
			crossdomain: true,
			data: {
				operationId,
				modifyConcept,
				modifyAmount,
				modifyDate,
				token: JSON.parse(localStorage.getItem('user')).token
			}
		})
			.then((res) => {
				const { status, user } = res.data;
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