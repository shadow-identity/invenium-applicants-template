const basicRequest = (query: string, variables: any) => {
	return fetch('http://localhost:3000/api/graphql', {
		method: 'POST',
		body: JSON.stringify({ query, variables }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export const loginRequest = async (email: string, password: string) => {
	const response = await basicRequest(`query {
    login(username: "${email}", password: "${password}") {
      token
    }
  }
`, {})
	return response.json().then((data) => data.data.login.token).catch(() => false)
}

// export const visitorsOverTimeRequest = async (token: string) => {
// 	const response = await basicRequest(`query {
//     visitorsOverTime {
//       date
//       visitors
//     }
//   }
// `, {})
// 	return response.json()
// }