import { useContext, useEffect, useState } from "react";
import style from "./RightSideBar.module.css"
import { PostHandlerContext } from "../../../Contexts/PostHandlerProvider/PostHandlerProvider";
import TAG from "../../../Contexts/TagsProvider/Tags/TAG";

function RightSideBar() {
    
    const {lastWeekTags, popularTags, tags} = useContext(PostHandlerContext)

    const [lwtList, setLwtList] = useState([])
    const [ptList, setPtList] = useState([])

    const convertTags = (l,setL) => {
        let temp = []
        // Object.entries(lastWeekTags).forEach(([key, value]) => {
        //     const matchingTags = tags.filter((tag) => tag.name === key);
        //     temp.push(matchingTags[0]);
        // });
        l.map((lwt) => {
            console.log(lwt)
            temp.push(tags.filter((tag) => tag.name === lwt)[0])
        })
        console.log(temp)
        setL(temp)
    }

    useEffect(() => {
        convertTags(lastWeekTags, setLwtList)
    }, [lastWeekTags])

    useEffect(() => {
        console.log(popularTags)
        convertTags(popularTags, setPtList)
    }, [popularTags])


    return (
        <div className={style.content}>
            <div className={style.tagsWrapper}>
                <div className={style.tagsContainer}>
                    <h4 className={style.h}>Trending tags</h4>
                    <div className={style.tags}>
                        {lwtList.map((tag) => {
                            return <TAG name={tag.name} color={tag.color} icon={tag.icon}/>
                        })}
                    </div>
                </div>
                <div className={style.tagsContainer}>
                    <h4 className={style.h}>All-time tags</h4>
                        <div className={style.tags}>
                            {ptList.map((tag) => {
                                return <TAG name={tag.name} color={tag.color} icon={tag.icon}/>
                            })}
                        </div>
  
                </div>
            </div>
        </div>
    )
}

export default RightSideBar;