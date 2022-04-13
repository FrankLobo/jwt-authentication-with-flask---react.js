const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// url: "https://3000-franklobo-jwtauthenticat-n1iok8ik5no.ws-us39a.gitpod.io",
			url: "https://3001-franklobo-jwtauthenticat-n1iok8ik5no.ws-us39a.gitpod.io",
			signup: null,
			logged: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// // Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// getMessage: () => {
			// 	// fetching data from the backend
			// 	fetch(process.env.BACKEND_URL + "/api/hello")
			// 		.then(resp => resp.json())
			// 		.then(data => setStore({ message: data.message }))
			// 		.catch(error => console.log("Error loading message from backend", error));
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });

			// },
			signUp: (formData, history) => {
				const { url } = getStore()
				fetch(`${url}/api/signup`, {
					method: 'POST',
					body: formData
				})
					.then(response => response.json())
					.then(data => {
						console.log("FLUX DATA", data)
						sessionStorage.setItem("token", JSON.stringify(data))
						setStore({ signup: data })
						history.push("/home")
					})
					.catch(error => console.log("HA OCURRIDO UN ERROR", error))
			},
			login: (formData, history) => {
				const { url } = getStore()
				fetch(`${url}/api/login`, {
					method: 'POST',
					body: formData
				})
					.then(response => response.json())
					.then(data => {
						console.log("FLUX DATA", data)
						sessionStorage.setItem("token", JSON.stringify(data))
						history.push("/home")
						setStore({ logged: data })
					})
					.catch(error => console.log("HA OCURRIDO UN ERROR", error))
			},
			logOut: (history) => {
				sessionStorage.removeItem("token")
				history.push("/login")
			}
		}
	};
};

export default getState;
