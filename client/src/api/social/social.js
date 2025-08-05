import axios from 'axios'

const BASE_URL= `http://localhost:8080/api/post`

export const handlePost=async (postData)=>{
    try{
        const posted= await axios.post(`${BASE_URL}/upload`, postData)
        return posted.data
    }
    catch(error){
        console.log(error)
    }
}

export const getAllPosts=  async(userId)=>{
    try{
        const posts= await axios.get(`${BASE_URL}/${userId}`)
        return posts.data
    }
    catch(error){
        console.log(error)
    }
}