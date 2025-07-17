import axios from 'axios'

const API_URL=`http://localhost:8080/api/blogs`

export const getAllBlogs=async(req, res)=>{
    try{
        const response= await axios.get(`${API_URL}/all`)
        return response.data    //dont return it inside an object like {blogs: response.data}
    }
    catch(error){
        console.log(error)
    }
}

export const getOneBlog=async(req, res)=>{
    try{
        const id= req.params.id
        const response= await axios.get(`${API_URL}/${id}`)

        return {blog: response.data}
    }
    catch(error){
        console.log(error)
    }
}

export const createBlog=async(req,res)=>{
    try{
        const blog= req.body;
        const response= await axios.post(`${API_URL}/blog`, blog)
        return {blogged: response.data}
    }
    catch(error){

    }
}