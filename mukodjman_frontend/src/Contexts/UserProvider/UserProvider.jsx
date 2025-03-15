import {createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"
import {PostHandlerContext} from "../PostHandlerProvider/PostHandlerProvider"
import axios from "axios"
import { UNSAFE_getSingleFetchDataStrategy } from "react-router-dom"

export const UserContext = createContext()

export function UserProvider({children}) {

    const {user} = useContext(AuthContext)
    const {authorId, setFollowedDreams, dreams} = useContext(PostHandlerContext)
    const [followedUsers, setFollowedUsers] = useState([])
    const [blockedUsers, setBlockedUsers] = useState([])
    
    useEffect(() => {    
        if (user) {
            axios.get(`http://localhost:4400/user/get-followed-users/${user.id}`).then((response) => {
                console.log(response)
                setFollowedUsers(response.data)
            }).catch((error) => console.log(error))
    
            axios.get(`http://localhost:4400/user/get-blocked-users/${user.id}`).then((response) => {
                console.log(response)
                setBlockedUsers(response.data)
            }).catch((error) => console.log(error))

            axios.get(`http://localhost:4400/dream/user-liked-posts/${user.id}`).then((response) => {
                
            }).catch((error) => console.log(error))
            // TODO: megcsinalni hogy ha followed a user, akkor unfollow jelenjen meg :)))))
        }
    },[user])

    const blockUser = (userToBlock) => {
        axios.post("http://localhost:4400/user/block-user", {userId:user.id, authorId:authorId}).then((response) => {
            window.location.reload()
        }).catch((error) => console.log(error))
    }

    const followUser = (userToFollow) => {
        console.log(authorId)
        axios.post("http://localhost:4400/user/follow-user", {userId:user.id, userToBeFollowedId:authorId}).then((response) => {
            axios.get(`http://localhost:4400/dream/get-followed/${user.id}`).then((response2) => {
                setFollowedDreams(response2.data);
                
            }).catch((error) => console.log(error));
            axios.get(`http://localhost:4400/user/get-followed-users/${user.id}`).then((response) => {
                console.log(response.data)
                setFollowedUsers(response.data)
            }).catch((error) => console.log(error))
        }).catch((error) => console.log(error))
    }

    const isUserFollowed = () => {
        return followedUsers.some((user) => user.id === authorId)
        
    }

    
    const unFollowUser = (userToUnfollow) => {
        console.log(authorId)
        axios.post(`http://localhost:4400/user/unfollow-user/${user.id}`, {userId: user.id, userToBeFollowedId:authorId}).then((response) => {
            console.log("response.data");
            axios.get(`http://localhost:4400/dream/get-followed/${user.id}`).then((response2) => {
                setFollowedDreams(response2.data);
                
            }).catch((error) => console.log(error));
            axios.get(`http://localhost:4400/user/get-followed-users/${user.id}`).then((response) => {
                setFollowedUsers(response.data)
            })
            // setFollowedUsers(response.data)
        })
    }


    return <UserContext.Provider value={{blockUser, followUser, followedUsers, blockedUsers, isUserFollowed, unFollowUser}}>
            {children}
        </UserContext.Provider>
}