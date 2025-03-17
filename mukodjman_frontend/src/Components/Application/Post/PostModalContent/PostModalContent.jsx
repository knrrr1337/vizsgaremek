import { useContext } from "react";
import PFP from "../../../PFP/PFP";
import style from "./PostModalContent.module.css"
import { PostHandlerContext } from "../../../../Contexts/PostHandlerProvider/PostHandlerProvider";

function PostModalContent(props) {
    
    const {prettifyDate} = useContext(PostHandlerContext)

    return (
        <>
        <div className={style.container}>
            <div className={style.woah}>
                <div className={style.pfpdiv}>
                    <PFP size={{width:40, height:40}} isUser={false} profilePicture={props.pfp}/>
                {console.log(props)}
                </div>
                <div className={style.userRow}>
                    <span>{props.username}</span>
                    <span className={style.timeposted}>{prettifyDate(props.posted_at)}</span>
                </div>
            </div>
            RAKODLEGYEN
        </div>
        </>
    )
}

export default PostModalContent;