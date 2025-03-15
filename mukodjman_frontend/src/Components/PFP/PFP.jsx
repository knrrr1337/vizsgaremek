import { useContext, useEffect } from "react";
import style from "./PFP.module.css"
import Person2Icon from '@mui/icons-material/Person2';
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

function PFP({size, isUser, profilePicture}) {

    const {user,setUser, rememberMe} = useContext(AuthContext)

    // useEffect(() => {
    //     if (rememberMe) {
    //         setUser(localStorage.getItem("user"))
    //     }
    // }, [user])

    return (
        <>
        <div className={style.pfpdiv} style={{width:`${size.width}px`, height:`${size.height}px`}}>
            {(user && isUser) ? <img src={`http://localhost:4400/uploads/${user.profilePicture}`} alt="Profile" /> : (profilePicture !== "default" ? (
    
                    <img src={`http://localhost:4400/uploads/${profilePicture}`} alt="Profile" />
                ) : (
                    <Person2Icon />        
                ))}
        </div>
        </>
    )
}

export default PFP;