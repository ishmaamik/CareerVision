import axios from 'axios'

const API_URL = 'http://localhost:8080/api/users'

export const login = async (creds) => {
    try {
        const email = creds.email
        const password = creds.password

        const response = await axios.post(`${API_URL}/login`, {
            email, password
        })

        return { user: response.data };
    }
    catch (error) {
        console.log(error);
    }
}

export const register = async (creds) => {
    try {
        const name = creds.name
        const email = creds.email
        const pass = creds.password
        const role = creds.role

        const response = await axios.post(`${API_URL}/signup`, { name: name, email: email, password: pass, role: role })

        return { user: response.data }
    }
    catch (error) {
        console.log(error)
    }
}