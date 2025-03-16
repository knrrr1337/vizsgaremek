import { createContext, useState, useContext, useEffect } from "react";
import {AuthContext} from "../AuthProvider/AuthProvider"
import axios from "axios"


export const PostHandlerContext = createContext();

export function PostHandlerProvider({children}) {
    
    const prettifyDate = (date) => {
        const splitted = date.split("T");
        const datePart = splitted[0].split("-");
        const timePart = splitted[1].split(":");

        const year = datePart[0];
        const month = datePart[1];
        const day = datePart[2];
        const hour = timePart[0];
        const minute = timePart[1];

        let prettyMonth = "";

        switch (month) {
            case "01":
                prettyMonth = "Jan";
                break;
            case "02":
                prettyMonth = "Feb";
                break;
            case "03":
                prettyMonth = "Mar";
                break;
            case "04":
                prettyMonth = "Apr";
                break;
            case "05":
                prettyMonth = "May";
                break;
            case "06":
                prettyMonth = "Jun";
                break;
            case "07":
                prettyMonth = "Jul";
                break;
            case "08":
                prettyMonth = "Aug";
                break;
            case "09":
                prettyMonth = "Sep";
                break;
            case "10":
                prettyMonth = "Oct";
                break;
            case "11":
                prettyMonth = "Nov";
                break;
            case "12":
                prettyMonth = "Dec";
                break;
            default:
                prettyMonth = month;
        }

        return `${year} ${prettyMonth}. ${day} at ${hour}:${minute}`;
    };

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

    // const createPost = (title, content, publicity, images) => {
    //     console.log(images)
    //     // TODO: megbaszni a kepeket 
    //     console.log(title + " " + content + " " + publicity + " " + user.id)
    //     // axios.post("http://localhost:4400/dream/create-dream", {title:title, content:content, userId:user.id, tags:"", privacy:publicity}).then((response) => {
    //     //     console.log(response)
    //     //     axios.get(`http://localhost:4400/dream/list-dreams-all/${user.id}`).then((response) => {
    //     //         setDreams(response.data)
    //     //     }).catch((error) => console.log(error))
    //     //     axios.get(`http://localhost:4400/dream/get-user-dreams/${user.id}`).then((response) => {
    //     //         setMydreams(response.data)
    //     //     })
            
    //     // }).catch((error) => console.log(error))
    // }
    const createPost = (title, content, publicity, images) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("userId", user.id);
        formData.append("privacy", publicity);
        formData.append("tags", "");
        
        // Append each image with a unique key
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });
    
        axios.post("http://localhost:4400/dream/create-dream", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
            axios.get(`http://localhost:4400/dream/list-dreams-all/${user.id}`).then((response) => {
                setDreams(response.data);
            }).catch((error) => console.log(error));
            
            axios.get(`http://localhost:4400/dream/get-user-dreams/${user.id}`).then((response) => {
                setMydreams(response.data);
            });
        }).catch((error) => console.log(error));
    };

    const editPost = () => {
        // todo
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
        <PostHandlerContext.Provider key={keyy} value={{dreams, setDreams, getPosts, openPostMenu, apad, anyad, mousePos, setMousePos, authorId, followedDreams, setFollowedDreams, blockedDreams, keyy, likePost, commentOnPost, likedPosts, setLikedPosts, unLikePost, createPost, editPost, deletePost, postId, mydreams, setMydreams, prettifyDate}}>
            {children}
        </PostHandlerContext.Provider>
    )

}