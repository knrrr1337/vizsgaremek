import { useContext, useState, useEffect } from "react";
import PFP from "../../../PFP/PFP";
import style from "./PostModalContent.module.css"
import { PostHandlerContext } from "../../../../Contexts/PostHandlerProvider/PostHandlerProvider";
import Post from "../Post";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotesIcon from '@mui/icons-material/Notes';
import Comment from "../../../Comment/Comment";
import { Modal } from "@mui/material";
import TAG from "../../../../Contexts/TagsProvider/Tags/TAG";



function PostModalContent(props) {
    
    const {prettifyDate, tags} = useContext(PostHandlerContext)
        // const [pictureModal, setPictureModal] = useState(false)
        // const [pictureToDisplay, setPictureToDisplay] = useState("")
    
        // const handlePictureModal = () => {
        //     setPictureModal(false)
        //     setPictureToDisplay("")
        // }

        const [tagonpost, setTagponpost] = useState([])

        const handleTags = () => {
            let buh = props.tags && props.tags.split("#")
            let cigany = []
            buh && buh.forEach((b) => {
                cigany.push(tags.filter((t) => t.name === b)[0])
            })
        
            setTagponpost(cigany)
    
        }
        
    
        useEffect(() => {
            handleTags()
        }, [props.tags, tags])

    return (
        <>       
        
          
        <div className={style.container}>
            <div className={style.woah}>
                <div className={style.pfpdiv}>
                    <PFP size={{width:40, height:40}} isUser={false} profilePicture={props.pfp}/>
                </div>
                <div className={style.userRow}>
                    <span>{props.username}</span>
                    <span className={style.timeposted}>{prettifyDate(props.posted_at)}</span>
                </div>
            </div>
            <div className={style.content}>
                <div className={style.titlerow}>
                    <h2>{props.title}</h2>
                </div>
                <div className={style.text}>
                    <span>{props.content}</span>
                </div>
                <div className={style.tagsrow}>
                    {tagonpost.map((tag) => {
                        return <TAG name={tag.name} icon={tag.icon} color={tag.color}/>
                    })}
                </div>
                <div className={style.reactionsContainer}>
                    <div className={style.reactions}>
                        
                            <>
                        <div className={style.d} title={`${props.comments.length} comments`} onClick={(e) => {
                            e.stopPropagation();
                            
                        }}>
                            <NotesIcon />
                            {props.comments.length}
                        </div>

                        <div className={style.d} style={{cursor:"pointer"}} title={`${props.likes} likes`} onClick={(e) => {
                            e.stopPropagation();
                            props.handleLike(props.id);
                        }}>
                            {props.isLiked ? (
                                <FavoriteIcon />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                            {props.likes}
                        </div>
                            </>
                    </div>
                </div>
                <div className={style.images} style={{display: props.images && props.images.length === 0 ? "none" : "flex"}}>
                        {props.images && props.images.map((image) => {
                            return <div onClick={(e) => {
                                e.stopPropagation()
                                props.setPictureModal(true)
                                props.setPictureToDisplay(image.imageUrl)
                            }} style={{backgroundImage: `url(${`http://192.168.1.133:4400/uploads/${image.imageUrl}`})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '200px',
                            height: '200px',
                            position:"relative",
                            zIndex:1,
                            borderRadius: '8px',
                            cursor: 'pointer'}}/>
                        })}
                </div>

                <div className={style.commentsContainer}>
                    {props.comments.length === 0 ? (<div className={style.nocomments}>No comments</div>) : (props.comments.map((comment, index) => {
                        return <Comment last={index + 1 === props.comments.length} commentUser={comment.commentUser} content={comment.content} created_at={comment.created_at}/>
                    }))}
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default PostModalContent;