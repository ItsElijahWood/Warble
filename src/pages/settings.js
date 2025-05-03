import { useEffect, useState } from "react";
import urls from "../url.js";
import Header from "../components/header.js";

function Settings() {
  const [displayResetPassword, setResetPasswordDisplay] = useState(false);
  const [displayDPP, setDisplayDPP] = useState(false);

  useEffect(() => {
    const checkProtected = async() => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found in localStorage.');

        window.location.href = "/";
        return;
      }
    
      try {
        const response = await fetch(`${urls().server_url}/api/protected`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Protected data:', data);
      } catch (err) {
        console.error('Failed to fetch protected data:', err);
      }
    }

  checkProtected();
  }, []);  

  const getUserId = async() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found in localStorage.');

      window.location.href = "/";
      return;
    }
  
    try {
      const response = await fetch(`${urls().server_url}/api/account/getUserId`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      return await response.json();
    } catch (err) {
      console.error('Failed to fetch protected data:', err);
    }
  } 

  const resetPasswordDisplayGUI = () => {
    if (displayResetPassword === false) {
      setResetPasswordDisplay(true);
    } else {
      setResetPasswordDisplay(false);
    }
  }

  async function pushResetPasswordToServer() {
    const user = await getUserId();
    const id = user?.userId;

    const old_password = document.getElementById("old-password").value;
    const new_password = document.getElementById("new-password").value;
    const errmsg = document.getElementById("errmsg");

    const reqBody = {
      id,
      old_password,
      new_password
    }

    const res = await fetch(`${urls().server_url}/api/reset_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    });

    const data = await res.json();

    if (res.ok) {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = window.location.href = "/";
      }

      localStorage.removeItem("token");
      window.location.href = window.location.href = '/';
    } else if (res.status === 400) {
      errmsg.innerHTML = data.Error;
    }
  }

  const openDDP = () => {
    if (displayDPP === false) {
      setDisplayDPP(true);
    } else {
      setDisplayDPP(false);
    }
  }

  async function deleteAccountPush() {
    const user = await getUserId();
    const id = user?.userId;

    const res = await fetch(`${urls().server_url}/api/account/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Id: id })
    })

    if (res.ok) {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/";
      }

      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }

  return (
    <>
      <style>
        {`
          @media (max-width: 480px) {
            .mobile_format_selector {
              margin-top: 0 !important;
              left: 0 !important;
              width: 100% !important;
            }
            .mobile_format_reset_password {
              width: 100% !important;
              height: 100% !important;
              top: 0 !important;
              max-width: 100% !important;
              min-width: 100% !important;
            }
          }
        `}
      </style>
      <Header />
      <div className="mobile_format_selector" style={{ backgroundColor: "#f4f4f4", padding: "10px", marginTop: "10px", borderRadius: "15px", width: "80%", height: "100%", position: "absolute", left: "10%" }}>
        <div style={{ paddingLeft: "2rem" }}>
          <p style={{ fontFamily: "publicsans", fontSize: "30px", paddingBottom: "20px" }}>Account Settings</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <a href="#reset_password" onClick={resetPasswordDisplayGUI} style={{ fontFamily: "publicsans", width: "120px", userSelect: "none", textDecoration: "none", backgroundColor: "red", borderRadius: "10px", cursor: "pointer", padding: "10px", color: "white", marginBottom: "1rem" }}>Reset Password</a>
            <a href="#delete_account" onClick={openDDP} style={{ fontFamily: "publicsans", userSelect: "none", width: "120px", textDecoration: "none", backgroundColor: "red", borderRadius: "10px", cursor: "pointer", padding: "10px", color: "white" }}>Delete Account</a>
          </div>
        </div>
      </div>
      <div style={{ display: displayResetPassword ? "flex" : "none", position: "absolute", top: "0", left: "0", backgroundColor: "rgba(12, 151, 235, 0.3)", width: "100%", height: "100%" }}>
        <div className="mobile_format_reset_password" style={{ display: "flex", flexDirection: "column", width: "90%", height: "80%", minWidth: "600px", maxWidth: "600px", position: "absolute", borderRadius: "10px", top: "10%", left: "50%", zIndex: "9999", backgroundColor: "white", transform: "translateX(-50%)" }}>
          <a href="#close_reset_password_gui" onClick={resetPasswordDisplayGUI} style={{ fontFamily: "publicsans", width: "2rem", fontSize: "1.5rem", cursor: "pointer", textDecoration: "none", color: "black", display: "inline-block", paddingLeft: "1rem", userSelect: "none", paddingTop: "1rem", marginBottom: "1rem" }}>X</a>
          <div style={{ paddingLeft: "2.5rem" }}>
            <form style={{ display: "flex", paddingBottom: "14rem", flexDirection: "column", gap: "20px" }}>
              <p style={{ fontFamily: "publicsans", fontSize: "30px", paddingBottom: "10px" }}>Password Reset</p>
              <input style={{ padding: "15px", width: "80%" }} id="old-password" type="password" placeholder="Previous Password" />
              <input style={{ padding: "15px", width: "80%" }} id="new-password" type="password" placeholder="New Password" />
            </form>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <a href="#reset_account_password" onClick={pushResetPasswordToServer} style={{ textDecoration: "none", border: "2px solid black", borderBottomLeftRadius: "9999px", borderBottomRightRadius: "9999px", borderTopLeftRadius: "9999px", borderTopRightRadius: "9999px", color: "black", padding: "12px", fontFamily: "publicsans" }}>Reset Password</a>
              <p id="errmsg" style={{ fontFamily: "publicsans", paddingRight: "1.5rem" }}></p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: displayDPP ? "flex" : "none", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "absolute", width: "30%", height: "20%", borderRadius: "15px", backgroundColor: "#fff", border: "2px solid black", left: "50%", top: "35%", transform: "translateX(-50%)", minWidth: "300px" }}>
        <p style={{ maxWidth: "260px", fontFamily: "publicsans", fontSize: "16px" }}>Are you sure you want to delete your account? This is permanent.</p>
        <div style={{ display: "flex", gap: "15px" }}>
          <a href="#delete_account_true" onClick={deleteAccountPush} style={{ fontFamily: "publicsans", userSelect: "none", width: "100px", textDecoration: "none", backgroundColor: "red", borderRadius: "10px", cursor: "pointer", padding: "10px", color: "white" }}>Yes</a>
          <a href="#delete_account_false" onClick={openDDP} style={{ fontFamily: "publicsans", userSelect: "none", width: "100px", textDecoration: "none", backgroundColor: "red", borderRadius: "10px", cursor: "pointer", padding: "10px", color: "white" }}>No</a>
        </div>
      </div>
    </>
  )
}

export default Settings;
