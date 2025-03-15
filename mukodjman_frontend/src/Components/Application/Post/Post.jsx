import style from "./Post.module.css";
import Person2Icon from '@mui/icons-material/Person2';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PostHandlerContext } from "../../../Contexts/PostHandlerProvider/PostHandlerProvider";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotesIcon from '@mui/icons-material/Notes';
import { Modal, TextField } from "@mui/material";
import Button from "../../Button/Button";
import PostModalContent from "./PostModalContent/PostModalContent";
import { UserContext } from "../../../Contexts/UserProvider/UserProvider";
import PFP from "../../PFP/PFP";

function Post(props) {
    const navigate = useNavigate();
    const contentRef = useRef(null);
    const dropdownRef = useRef(null);
    const [likes, setLikes] = useState(props.reactions.length);
    const [comments, setComments] = useState(props.comments.length);
    const [isLiked, setIsLiked] = useState(false);

    const { apad, setMousePos, likePost, commentOnPost, likedPosts, unLikePost, prettifyDate} = useContext(PostHandlerContext);
    const {isUserFollowed} = useContext(UserContext)

    const goToPost = (postId) => {
        navigate(`/dream/${postId}`);
    };

    const checkOverflow = (element) => {
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    };

    const [NeedReadMore, setNeedReadMore] = useState(false);

    useEffect(() => {
        const contentElement = contentRef.current;
        if (checkOverflow(contentElement)) {
            setNeedReadMore(true);
        }
    }, []);

    useEffect(() => {
        setIsLiked(isPostLiked());
    }, [likedPosts]);

    const renderReadMore = () => {
        return (
            <>
                <div className={style.readMoreCover}>
                    <span>Read More</span>
                </div>
            </>
        );
    };

    const openDropdown = (event, authorId) => {
        event.stopPropagation();
        apad(authorId, props.id);
        const rect = dropdownRef.current.getBoundingClientRect();
        let middleX = rect.x + rect.width / 2;
        let middleY = rect.y + (rect.height / 2 + 5);

        setMousePos({ x: middleX, y: middleY });
        console.log(isUserFollowed())
    };

    const isPostLiked = () => {
        return likedPosts.some((hehe) => hehe.id === props.id);
    };

    const handleLike = (id) => {
        if (isLiked) {
            unLikePost(id);
            setLikes(likes - 1);
        } else {
            likePost(id);
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleComment = (id) => {
        // commentOnPost(id);
        setComments(comments + 1);
    };

    const [commentValue, setCommentValue] = useState("")
    const [postModal, setPostModal] = useState(false)

    const handlePostClose = () => {
        setPostModal(false)
    }

    const [commentModal, setCommentModal] = useState(false)
    const handleClose = () => {
        setCommentModal(false)
        setCommentValue("")
        setValid(false)
    }


    const [valid, setValid] = useState(false)
    const checkIfValid = (value) => {
        setValid(value.trim() !== "")
    }

    const prettifyPrivacy = (a) => {
        switch(a)  {
            case "PUBLIC": return "Public"
            case "FOLLOWERS_ONLY": return "Follower-only"
            case "PRIVATE": return "Private"
        }
    }



    return (
        <>
            <div className={style.content} onClick={() => setPostModal(true)}>
                <div style={{marginRight:"10px"}}>
                    <PFP size={{width:40, height:40}} profilePicture={props.pfp} isUser={false}/>
                </div>
                <div className={style.restbruh}>
                    <div className={style.valamiwrapper}>
                        <div className={style.userinfo}>
                            <span className={`${style.username} ${style.userinfospan}`}>{props.username} {props.privacy ? <span style={{margin:"0px", fontSize:"12px"}}> - {prettifyPrivacy(props.privacy)}</span> : ""}</span>
                            <span className={`${style.timeposted} ${style.userinfospan}`}>{prettifyDate(props.posted_at)}</span>
                        </div>
                        <div className={style.hererakk} ref={dropdownRef} onClick={(event) => openDropdown(event, props.authorId)}>
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <div className={style.postcontent}>
                        <h2>{props.title}</h2>
                        <div className={style.yappingtoncity} ref={contentRef}>
                            {NeedReadMore === true ? renderReadMore() : ""}
                            {props.content}
                        </div>
                    </div>
                    <div className={style.reactions}>
                        <div className={style.d} title={`${comments} comments`} onClick={(e) => {
                            e.stopPropagation();
                            setCommentModal(true);
                        }}>
                            <NotesIcon />
                            {comments}
                        </div>

                        <div className={style.d} title={`${likes} likes`} onClick={(e) => {
                            e.stopPropagation();
                            handleLike(props.id);
                        }}>
                            {isLiked ? (
                                <FavoriteIcon />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                            {likes}
                        </div>
                    </div>
                </div>
            </div>

            <Modal open={postModal} onClose={handlePostClose} style={{zIndex:10101011}} className={style.modalContainer}>
                <PostModalContent username={props.username} pfp={props.pfp} title={props.title} timeposted={prettifyDate(props.posted_at)} content={props.content}/>
            </Modal>
        
            <Modal open={commentModal} onClose={handleClose} style={{zIndex:1010111}} className={style.modalContainer}>
                
                    <div className={style.innerModal}>
                        <div className={style.szaros}>
                            <div className={style.userRow}>
                                <div className={style.pfpdiv}>
                                    {props.pfp && props.pfp !== "default" ? (
                                        <img src={`http://localhost:4400/uploads/${props.pfp}`} alt="Profile" />
                                    ) : (
                                        <Person2Icon />
                                    )}
                                </div>
                                <span>Replying to {props.username}</span>
                            </div>
                            <textarea placeholder="what it do" type="text" value={commentValue} onChange={(e) => {
                                setCommentValue(e.target.value)
                                checkIfValid(e.target.value)
                                }} className={style.textarea} />
                            <Button text="COMMENT" valid={valid} onClick={() => {
                                    // console.log(commentValue)
                                    // console.log(typeof commentValue)
                                    if (commentValue !== "") {
                                        commentOnPost(props.id, commentValue)
                                        handleClose()
                                        handleComment()
                                    }
                                }}/>
                        </div>
                    </div>
                
            </Modal>
        </>
    );
}

export default Post;