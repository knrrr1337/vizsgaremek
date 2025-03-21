import { useContext, useEffect, useState } from "react";
import style from "./RightSideBar.module.css"
import { PostHandlerContext } from "../../../Contexts/PostHandlerProvider/PostHandlerProvider";
import TAG from "../../../Contexts/TagsProvider/Tags/TAG";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Contexts/UserProvider/UserProvider";

function RightSideBar({width=300}) {

    const navigate = useNavigate()
    const {lastWeekTags, popularTags, tags, allPostByTag, trendingPostByTag} = useContext(PostHandlerContext)


    const [lwtList, setLwtList] = useState([])
    const [ptList, setPtList] = useState([])

    const convertTags = (l,setL) => {
        let temp = []
        // Object.entries(lastWeekTags).forEach(([key, value]) => {
        //     const matchingTags = tags.filter((tag) => tag.name === key);
        //     temp.push(matchingTags[0]);
        // });
        l.map((lwt) => {
            temp.push(tags.filter((tag) => tag.name === lwt)[0])
        })
        setL(temp)
    }

    useEffect(() => {
        convertTags(lastWeekTags, setLwtList)
    }, [lastWeekTags])

    useEffect(() => {
        convertTags(popularTags, setPtList)
    }, [popularTags])




    return (
        <div className={style.contentt} style={{width:`${width}px`}}>
            <div className={style.tagsWrapper}>
                <div className={style.tagsContainer}>
                    <h4 className={style.h}>Trending tags</h4>
                    <div className={style.tags}>
                        {lwtList.length === 0 ? (<div>No posts with tags in the last 7 days.</div>) : (lwtList.map((tag) => {
                            return <TAG onClick={() => {
                                trendingPostByTag(tag.name)
                                navigate(`/filter/${tag.name}-trending`)
                            }} name={tag.name} color={tag.color} icon={tag.icon}/>
                        }))}
                    </div>
                </div>
                <div className={style.tagsContainer}>
                    <h4 className={style.h}>All-time tags</h4>
                        <div className={style.tags}>
                            {ptList.map((tag) => {
                                return <TAG onClick={() => {
                                    allPostByTag(tag.name)
                                    navigate(`/filter/${tag.name}-all`)
                                }} name={tag.name} color={tag.color} icon={tag.icon}/>
                            })}
                        </div>
  
                </div>
            </div>
        </div>
    )
}

export default RightSideBar;