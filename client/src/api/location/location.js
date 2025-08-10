import axios from "axios"

const BASE_URL= `http://localhost:8080/api/location`

export const userLocation=(location, userId)=>{
    try{
        const response= axios.post(`${BASE_URL}/user/${userId}`, location)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}