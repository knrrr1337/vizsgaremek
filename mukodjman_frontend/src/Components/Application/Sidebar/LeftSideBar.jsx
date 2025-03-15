import style from "./LeftSideBar.module.css"

import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../..//Contexts/AuthProvider/AuthProvider';
import Person2Icon from '@mui/icons-material/Person2';
import axios from 'axios';
import { TextField } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import NotesIcon from '@mui/icons-material/Notes';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Modal from '@mui/material/Modal';
import PFP from "../../PFP/PFP";


function LeftSideBar() {

    const navigate = useNavigate()
    const {user, setUser} = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [which, setWhich] = useState("")

    const gotoProfile = () => {
        if (user) {
            navigate(`/profile/${user.id}`)
        }
    }

    const logout = () => {
        localStorage.clear()
        sessionStorage.clear()
        navigate("/login")
        window.location.reload()
    }

    const gotoHome = () => {
        navigate("/app")
    }

    const handleClose = () => setModalOpen(false)

    return (
    
        <div className={style.sideBar}>
            <div className={style.headerContent}>
                <div className={style.logo} onClick={gotoHome}>
                    <img src="/icon_white.png"></img>
                </div>
                <div className={style.profileBar} onClick={gotoProfile}>
                    <div style={{marginRight:"10px"}}>
                        <PFP size={{width:40, height:40}} profilePicture={user.profilePicture}/>

                    </div>
                    <div className={style.username}>
                        {user && user.username}
                    </div>
                </div>
                <div className={style.optionswrapper}>
                    <ul className={style.optionsul}>
                        {/* <li className={style.option} >
                            <NotesIcon className={style.asd}/>
                            <span>My notes</span>
                        </li> */}
                        <li className={style.option} onClick={() => {
                            setModalOpen(true)
                            setWhich("followers")
                        }}>
                            <RecentActorsIcon className={style.asd}/>
                            <span>Followers</span>
                        </li>
                        <li className={style.option} onClick={() => {
                            setModalOpen(true)
                            setWhich("blocks")
                        }}>
                            <div className={style.asd}>
                                <img src="/blockedlist.png" alt="" />
                            </div>
                            <span>Blocked</span>
                        </li>
                        <li className={`${style.option} ${style.logout}`} onClick={logout}>
                            <LogoutIcon className={style.asd}/>
                            <span>Log Out</span>
                        </li>
                    </ul>
                </div>

            </div>
            <Modal open={modalOpen} onClose={handleClose}>
                {which === "followers" ? <div>follows</div> : <div>blocks</div>}
            </Modal>

        </div>

    )
}

export default LeftSideBar;