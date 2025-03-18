import style from "./TAG.module.css"
import React, {cloneElement} from "react"

function TAG(props) {

    const iconWithProps = cloneElement(props.icon, {
        color: props.color,
        
    });

    let rgba = props.color.replace(")", ", 0.3)").replace("rgb", "rgba")
    console.log(rgba)

    return (
        <>
        <div className={style.container} style={{border:`2px solid ${props.color}`, borderRadius:"10px", backgroundColor:`${rgba}`}}>
            <div className={style.iconContainer}>
                {props.icon}
            </div>
            <span style={{color:`rgb(${props.color})`}}>{props.name}</span>
        </div>
        </>
    )
}

export default TAG;