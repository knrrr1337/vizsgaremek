import style from "./Feed.module.css"
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import Person2Icon from '@mui/icons-material/Person2';
import axios from 'axios';
import Post from '../Application/Post/Post';
import { TextField } from '@mui/material';
import LeftSideBar from '../Application/Sidebar/LeftSideBar';
import { PostHandlerContext } from '../../Contexts/PostHandlerProvider/PostHandlerProvider';
import GoatedPostMenu from '../GoatedPostMenu/GoatedPostMenu';
import RightSideBar from '../Application/Sidebar/RightSideBar';
import Button from "../Button/Button";
import PFP from "../PFP/PFP";


function Feed({feedType, setFeedType}) {

    const navigate = useNavigate()
    const {user, setUser, rememberMe} = useContext(AuthContext)
    const {dreams, setDreams, getPosts, openPostMenu, anyad, followedDreams, blockedDreams, keyy, createPost} = useContext(PostHandlerContext)

    const logout = () => {
        localStorage.clear()
        sessionStorage.clear()
        navigate("/login")
    }

    const sortByDate = () => {

        return dreams && dreams.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    useEffect(() => {
        if (rememberMe) {
            if (localStorage.getItem("user") !== null) {
                setUser(JSON.parse(localStorage.getItem("user")))
            }
            getPosts(JSON.parse(localStorage.getItem("user")).id)

        }

        sortByDate()
        

    }, [])

    const csin = () => {
    
        console.log(sortByDate())
    }

    const gotoProfile = () => {
        navigate(`/profile`)
    }

    const changeFeed = (feed) => {
        setFeedType(feed)
    }

    useEffect(() => {
        let mainelement = document.querySelector("main")
        mainelement.addEventListener("scroll", () => {
            anyad()
        })
    }, [openPostMenu])

    useEffect(() => {
        filterOutBlockedDreams();
    }, [blockedDreams]);
    
    const filterOutBlockedDreams = () => {
        if (blockedDreams && dreams) {
            const blockedUserIds = blockedDreams.map(dream => dream.user.id);
            const filteredDreams = dreams.filter(dream => !blockedUserIds.includes(dream.user.id));
            setDreams(filteredDreams)   

        }
    }

    const [postContent, setPostContent] = useState("")
    const [titleContent, setTitleContent] = useState("")
    const [valid, setValid] = useState(false)

    const checkIfValid = (title, value) => {
        setValid(title.trim() !== "" && value.trim() !== "");
    }

    const [publicity, setPublicity] = useState("PUBLIC")

    return (
        <>
        <div className={style.createPost}>
                    <PFP size={{width: 40, height:40}} isUser={true}/>
                    <div className={style.restbruh}>
                        <div className={style.textareawrapper}>
                            <input value={titleContent} onChange={(e) => {
                                setTitleContent(e.target.value)
                                checkIfValid(e.target.value, postContent)
                            }} className={style.title} type="text" placeholder="Catchy title"/>
                            <textarea value={postContent} onChange={(e) => {
                                setPostContent(e.target.value)
                                checkIfValid(titleContent, e.target.value)
                            }} placeholder='What did you dream about?'/>
                        </div>
                        <div className={style.postrow}>
                            <select className={style.publicitySelector} value={publicity} onChange={(e) => setPublicity(e.target.value)}>
                                <option value="PUBLIC" onClick={(e) => setPublicity(e.target.value)}>Public</option>
                                <option value="FOLLOWERS_ONLY" onClick={(e) => setPublicity(e.target.value)}>Follower-only</option>
                                <option value="PRIVATE" onClick={(e) => setPublicity(e.target.value)}>Private</option>
                            </select>
                            <Button valid={valid} text="POST" onClick={() => {
                                createPost(titleContent, postContent, publicity)
                                setPostContent("")
                                setTitleContent("")
                                
                            }}/>
                        </div>
                    </div>
                </div>
                <div className={style.dreams}>
                    {feedType === "foryou" ? (
                        dreams && dreams.map((dream) => (
                            <Post
                                key={dream.id}
                                id={dream.id}
                                authorId={dream.user.id}
                                pfp={dream.user.profilePicture}
                                username={dream.user.username}
                                title={dream.title}
                                content={dream.content}
                                posted_at={dream.createdAt}
                                comments={dream.comments}
                                reactions={dream.reactions}
                            />

                        ))
                    ) : (
                        followedDreams && followedDreams.map((dream) => (
                            <Post
                                key={dream.id}
                                id={dream.id}
                                authorId={dream.user.id}
                                pfp={dream.user.profilePicture}
                                username={dream.user.username}
                                title={dream.title}
                                content={dream.content}
                                posted_at={dream.createdAt}
                                comments={dream.comments}
                                reactions={dream.reactions}
                            />
                        ))
                    )}
                    {feedType === "following" && followedDreams.length === 0 ? <div style={{paddingTop:"20px"}}>You currently don't follow anyone maganyos geci</div> : <div></div>}
                </div>
        </>
    )
}

export default Feed;