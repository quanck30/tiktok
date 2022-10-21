import axios from "axios"

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})
export const get = async (api, options = {}) => {
    const response = await request.get(api, options)
    return response.data
}
export default request