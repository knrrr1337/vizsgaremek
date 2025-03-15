import { useContext, useEffect } from "react"
import style from "./Profile.module.css"
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider"
import axios from "axios"
import LeftSideBar from "../Sidebar/LeftSideBar"
import RightSideBar from "../Sidebar/RightSideBar"
import Person2Icon from '@mui/icons-material/Person2';
import Feed from "../../Feed/Feed"
import { useState } from "react"
import Post from "../Post/Post"
import GoatedPostMenu from "../../GoatedPostMenu/GoatedPostMenu"
import { PostHandlerContext } from "../../../Contexts/PostHandlerProvider/PostHandlerProvider"
import PFP from "../../PFP/PFP"


function Profile () {



    const {user, setUser} = useContext(AuthContext)
    const {mydreams, prettifyDate} = useContext(PostHandlerContext)



    useEffect(() => {
        
        let userid 
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            userid = JSON.parse(storedUser).id
            // setUser(JSON.parse(storedUser));

        }
        console.log("iserid " + userid)



        
        
        console.log(user)
    }, [user])




    return (
        <>
        
           <div className={style.content}>
                <LeftSideBar/>
                <main>
                    <div className={style.profile_container}>
                        <div className={style.pfp_name}>
                            <div className={style.pfp_container}>
                                <PFP size={{width:100, height:100}} isUser={true}/>
                                
                            </div>
                            <div className={style.desc}>
                                <span className={style.username}>{user && user.username}</span>
                                <span className={style.joined}>{`joined on ${user && prettifyDate(user.created_at)}`}</span>
                                <span className={style.bio}>{user && user.bio}</span>    
                            </div>
                        </div>
                    </div>
                    <div className={style.post_container}>
                        {mydreams.length === 0 ? <div>You have not posted anything</div> : ""}
                        {mydreams.map((dream) => {
                            return <Post
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
                                privacy={dream.privacy}
                            ></Post>
                        })}
                    </div>
                </main>
                <RightSideBar/>
            </div> 
            <GoatedPostMenu what={"profile"}></GoatedPostMenu>
            <footer>anyad</footer>
        </>
    )

}

export default Profile