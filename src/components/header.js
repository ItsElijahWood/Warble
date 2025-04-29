import { useState, useRef, useEffect } from "react";
import "../static/css/fonts.css";

function Header() {
  const [displayProfileMenu, setProfileMenu] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
      const clickOutside = (e) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target) &&
          profileRef.current &&
          !profileRef.current.contains(e.target)
        ) {
          setProfileMenu(false);
        }
      }

      document.addEventListener("mousedown", clickOutside);

      return () => {
        document.removeEventListener("mousedown", clickOutside);
      }
  }, []);

  const ProfileMenu = () => {
    setProfileMenu(!displayProfileMenu);
  }

  return (
    <>
      <style>
        {`
          .menu-button:hover {
            background-color: #F5F5F5;
          }
        `}
      </style>
      <div style={{ width: '100%', height: '80px', backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ paddingLeft: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", }}>
          <div>
            <p style={{ fontSize: "22px", fontFamily: "publicsans" }}>Warble</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "1rem"}}>
            <img ref={profileRef} onClick={ProfileMenu} style={{ cursor: "pointer", border: "2px solid black", borderRadius: "9999px", userSelect: "none" }} src="./default_profile.jpg" alt="Profile button" width="50px" height="50px"></img>
          </div>
        </div>
      </div>
      <div ref={menuRef} style={{ display: displayProfileMenu ? "flex" : "none", flexDirection: "column", borderRadius: "10px", position: "absolute", right: "10px", top: "70px", width: "150px", height: "150px", border: "2px solid black", alignItems: "center" }}>
        <a className="menu-button" href="#profile" style={{ textDecoration: "none", height: "20px", width: "80%", padding: "8px", color: "black", fontFamily: "publicsans", borderRadius: "15px", marginTop: "0.5rem" }}>Profile</a>
        <a className="menu-button" href="#settings" style={{ textDecoration: "none", height: "20px", width: "80%", padding: "8px", color: "black", fontFamily: "publicsans", borderRadius: "15px" }}>Settings</a>
      </div>
    </>
  )
}

export default Header;
