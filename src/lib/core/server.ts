import { getUserToken } from "./session/session-server"




export const authHeader = async()=>{
    const token = await getUserToken()
    console.log(token, 'hello hi token')
    const header = {
        authorization: `Bearer ${token}`
    }
    return header? header : {}
}