import { createContext, useState, useContext, useEffect } from "react";
import {AuthContext} from "../AuthProvider/AuthProvider"
import axios from "axios"


export const PostHandlerContext = createContext();

export function PostHandlerProvider({children}) {
    
    const [dreams, setDreams] = useState(null)
    const [openPostMenu, setOpenPostMenu] = useState(false)
    const {user} = useContext(AuthContext);
    const [mousePos, setMousePos] = useState({})
    const [authorId, setAuthorId] = useState({})
    const [postId, setPostId] = useState(0)
    const [blockedDreams, setBlockedDreams] = useState([])
    const [followedDreams, setFollowedDreams] = useState([])
    const [keyy, setkeyy] = useState(0)
    const [likedPosts, setLikedPosts] = useState([])
    const [mydreams, setMydreams] = useState([])

    let followeddreams
    let blockeddreams

    useEffect(() => {
        if (user) {
            getPosts(user.id);
        }
    }, [user]);

    const getPosts = (id) => {



        axios.get(`http://localhost:4400/dream/list-dreams-all/${id}`).then((response) => {
            console.log(response.data)
            setDreams(response.data);
        }).catch((error) => console.log(error));

        axios.get(`http://localhost:4400/dream/get-followed/${id}`).then((response2) => {
            setFollowedDreams(response2.data);
        }).catch((error) => console.log(error));

        axios.get(`http://localhost:4400/dream/get-blocked/${id}`).then((response2) => {
            setBlockedDreams(response2.data);
        }).catch((error) => console.log(error));
        axios.get(`http://localhost:4400/dream/user-liked-posts/${id}`).then((response) => {
            setLikedPosts(response.data)
        }).catch((error) => console.log(error))
        axios.get(`http://localhost:4400/dream/get-user-dreams/${id}`).then((response) => {
            setMydreams(response.data)
        })

    };


    const likePost = (id) => {
        let likedDream = dreams.filter((dream) => dream.id === id)[0]
        
        setLikedPosts((prevDream) => [...prevDream, likedDream])
        axios.post(`http://localhost:4400/dream/like-post/${id}`, {userId:user.id, postId:id})
    }

    const unLikePost = (id) => {
        let newDreams = dreams.filter((dream) => dream.id !== id)
        setLikedPosts((prevLikedPosts) => prevLikedPosts.filter((post) => post.id !== id))
        axios.post(`http://localhost:4400/dream/remove-like-post/${id}`, {userId:user.id, postId:id}).then((response) => {

        }).catch((error) => console.log(error))
    }

    const commentOnPost = (id, content) => {
        console.log(id + " " + content)
        axios.post(`http://localhost:4400/dream/comment-on-dream/${id}`, {comment:content, userId:user.id}).then((response) => {
            console.log(response)
        }).catch((error) => console.log(error))
    }




    const createPost = (title, content, publicity) => {
        console.log(title + " " + content + " " + publicity + " " + user.id)
        axios.post("http://localhost:4400/dream/create-dream", {title:title, content:content, userId:user.id, tags:"", privacy:publicity}).then((response) => {
            console.log(response)
            axios.get(`http://localhost:4400/dream/list-dreams-all/${user.id}`).then((response) => {
                setDreams(response.data)
            }).catch((error) => console.log(error))
            axios.get(`http://localhost:4400/dream/get-user-dreams/${user.id}`).then((response) => {
                setMydreams(response.data)
            })
            
        }).catch((error) => console.log(error))
    }

    const editPost = () => {

    }

    const deletePost = (dreamId) => {
        console.log("DELETING")
        axios.delete(`http://localhost:4400/dream/delete-dream/${dreamId}`).then((response) => {
            axios.get(`http://localhost:4400/dream/list-dreams-all/${user.id}`).then((response1 => {
                setDreams(response1.data)
            }))
            axios.get(`http://localhost:4400/dream/get-user-dreams/${user.id}`).then((response1) => {
                setMydreams(response1.data)
            }).catch((error) => console.log(error))
        }).catch((error) => console.log(error))
    }



    const apad = (authorId, id) => {
        setOpenPostMenu(true)
        setAuthorId(authorId)
        setPostId(id)
    }

    const anyad = () => {
        setOpenPostMenu(false)
    }





    
    return (
        <PostHandlerContext.Provider key={keyy} value={{dreams, setDreams, getPosts, openPostMenu, apad, anyad, mousePos, setMousePos, authorId, followedDreams, setFollowedDreams, blockedDreams, keyy, likePost, commentOnPost, likedPosts, setLikedPosts, unLikePost, createPost, editPost, deletePost, postId, mydreams, setMydreams}}>
            {children}
        </PostHandlerContext.Provider>
    )

}