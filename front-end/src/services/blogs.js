import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const postBlog = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response = await axios.post(baseUrl, newBlog,config)
  return response.data
}
const updateBlog=async(upBlog,token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response=await axios.put(baseUrl+'/'+upBlog.id.toString(),upBlog,config)//Will have to include user id on upBlog
  return response.data
}
const deleteBlog=async(id,token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response=await axios.delete(baseUrl+'/'+id.toString(),config)
  return response.data
}
export default { getAll, postBlog, updateBlog, deleteBlog }
