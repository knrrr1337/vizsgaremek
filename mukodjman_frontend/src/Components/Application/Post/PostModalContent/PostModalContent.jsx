import PFP from "../../../PFP/PFP";
import style from "./PostModalContent.module.css"

function PostModalContent(props) {
    

    return (
        <>
        <div className={style.container}>
            <div className={style.woah}>
                <div className={style.pfpdiv}>
                    <PFP size={{width:40, height:40}} isUser={false} profilePicture={props.pfp}/>

                </div>
                <div className={style.userRow}>
                    <span>{props.username}</span>
                    <span className={style.timeposted}>{props.timeposted}</span>
                </div>
            </div>
            RAKODLEGYEN
        </div>
        </>
    )
}

export default PostModalContent;