import { useParams } from "react-router-dom";
import LeftSideBar from "../Application/Sidebar/LeftSideBar";
import RightSideBar from "../Application/Sidebar/RightSideBar";
import style from "./FilteredPosts.module.css";
import { useContext, useEffect } from "react";
import { PostHandlerContext } from "../../Contexts/PostHandlerProvider/PostHandlerProvider";
import Post from "../Application/Post/Post";
import GoatedPostMenu from "../GoatedPostMenu/GoatedPostMenu";
import { UserContext } from "../../Contexts/UserProvider/UserProvider";
import Footer from "../Footer/Footer";

function FilteredPosts(props) {

    const {param} = useParams()
    const {apbt, tpbt, allPostByTag, trendingPostByTag} = useContext(PostHandlerContext)
    const {isUserBlocked} = useContext(UserContext)
    useEffect(() => {
        let p = param.split("-")
        console.log(p[0])
        if (p[1] === "Trending") {
            trendingPostByTag(p[0])
        } else {
            allPostByTag(p[0])
        }
            
    }, [param])

    return (
        <>
        {console.log("helo")}
        <div className={style.content}>
            <LeftSideBar/>
            <main className={style.main}>
                <div className={style.posts}>
                    {param.split("-")[1] === "Trending" ? (
                        tpbt.map((dream) => {
                            if (isUserBlocked(dream.user.id)) {
                                return;
                            }
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
                                images={dream.images}
                                tags={dream.tags}
                            />
                        })
                    ) : (
                        apbt.map((dream) => {
                            console.log(dream)
                            if (isUserBlocked(dream.user.id)) {
                                return;
                            }
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
                                images={dream.images}
                                tags={dream.tags}
                            />
                        })
                    )}
                </div>
            </main>
            <RightSideBar/>
        </div>
        <GoatedPostMenu/>
        <Footer/>

        </>
    )

}

export default FilteredPosts;