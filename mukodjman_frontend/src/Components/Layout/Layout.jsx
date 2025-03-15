import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PostHandlerContext } from "../../Contexts/PostHandlerProvider/PostHandlerProvider";

const Layout = () => {
  
  useEffect(() => {
    let local = localStorage.getItem("user")
    if (local === "\"\"" || local === null) {
      navigate("/login")
    } else if (!window.location.pathname.startsWith("/profile")) {
      navigate("/app");
    }
  }, [])

  const {anyad} = useContext(PostHandlerContext)

  window.addEventListener("click", ()=> {
    anyad()
  })


  const navigate = useNavigate();
  
  return (
    <>
      <Outlet />
    </>
  )
};

export default Layout;