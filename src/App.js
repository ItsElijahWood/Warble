import { useState } from "react";
import urls from "./url.js";
import './static/css/fonts.css';

function App() {
  const [displayCreateAccount, setDisplayCreateAccount] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);

  const createAccountContainerDisplayer = (e) => {
    e.preventDefault();

    if (displayCreateAccount === false) {
      setDisplayCreateAccount(true);
    } else {
      window.location.href = "/";
    }
  }

  const years = [];
  for (let year = new Date().getFullYear(); year >= 1900; year--) {
    years.push(year);
  }

  const DDA = [];
  for (let DD = 1; DD <= 31; DD++) {
    DDA.push(DD);
  };

  const signContainerDisplayer = (e) => {
    e.preventDefault();

    if (displayLogin === false) {
      setDisplayLogin(true);
    } else {
      window.location.href = "/";
    }
  }

  return (
    <>
      <style>
        {`
          body {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          @media (max-width: 1100px) {
            .sign_in_container {
              width: 100% !important;
              height: 100% !important;
              position: static !important;
            }
            .create_account_container {
              width: 100% !important;
              height: 100% !important;
              position: static !important;
            }
            .create_account_container_format {
              padding-left: 1rem !important;
            }
            .sign_in_format {
              padding-left: 1rem !important;
            }
            .create_account_DOB {
              padding-bottom: 0 !important;
            }
          }
          @media (max-width: 480px) {
            .title {
              font-size: 38px !important;
            }
          }
        `}
      </style>
      <p className="title" style={{ fontFamily: "publicsans", fontSize: "50px", paddingTop: "29vh", paddingBottom: "10px" }}>Start warbling today</p>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "3px"}}>
          <a href="#create_account" onClick={createAccountContainerDisplayer} style={{ fontFamily: "publicsans", userSelect: "none", textDecoration: "none", border: "2px solid #0c97eb", cursor: "pointer", backgroundColor: "#0c97eb", padding: "10px 60px", borderBottomLeftRadius: "9999px", borderBottomRightRadius: "9999px", borderTopLeftRadius: "9999px", borderTopRightRadius: "9999px", color: "white" }}>Create an account</a><br />
          <a href="#sign_in" onClick={signContainerDisplayer} style={{ fontFamily: "publicsans", userSelect: "none", textDecoration: "none", border: "2px solid black", cursor: "pointer", padding: "10px 102px", borderBottomLeftRadius: "9999px", borderBottomRightRadius: "9999px", borderTopLeftRadius: "9999px", borderTopRightRadius: "9999px", color: "#0c97eb" }}>Sign in</a>
      </div>
      {/*Displays when #create_account anchor is pressed.*/}
      <div style={{ display: displayCreateAccount ? "flex" : "none", position: "absolute", zIndex: "9999", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(12, 151, 235, 0.3)" }}>
        <div className="create_account_container" style={{ backgroundColor: "white", width: "600px", height: "650px", position: "absolute", top: "10%", zIndex: "10000", left: "30%", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", opacity: "1" }}>
            <a href="#close_create_account" onClick={createAccountContainerDisplayer} style={{ fontFamily: "publicsans", textDecoration: "none", color: "black", cursor: "pointer", fontSize: "23px", paddingTop: "10px", paddingLeft: "15px", display: "inline-block" }}>X</a>
            <div className="create_account_container_format" style={{ paddingLeft: "6.5rem" }}>
              <p style={{ fontFamily: "publicsans", fontSize: "30px" }}>Create your account</p>
              <form>
                <input type="text" id="name" placeholder="Name" style={{ marginBottom: "20px", userSelect: "none", padding: "15px", width: "350px" }} required></input><br />
                <input type="email" id="email_create_account" placeholder="Email" style={{ marginBottom: "20px", userSelect: "none", padding: "15px", width: "350px" }} required></input>
                <p className="create_account_DOB" style={{ fontFamily: "publicsans", fontSize: "20px", paddingBottom: "5px" }}>Date of birth</p>
                <div style={{ display: "flex", gap: "15px" }}>
                  <select name="Day" defaultValue="day" id="DD" style={{ padding: "10px", userSelect: "none", width: "90px" }}> required
                    <option value="day" disabled>Day</option>
                    {DDA.map(D => (
                      <option key={D} value={D}>{D}</option>
                    ))}
                  </select>
                  <select name="Month" defaultValue="month" id="MM" style={{ padding: "10px", userSelect: "none", width: "160px" }}> required
                    <option value="month" disabled>Month</option>
                    <option id="M1">January</option>
                    <option id="M2">February</option>
                    <option id="M3">March</option>
                    <option id="M4">April</option>
                    <option id="M5">May</option>
                    <option id="M6">June</option>
                    <option id="M7">July</option>
                    <option id="M8">August</option>
                    <option id="M9">September</option>
                    <option id="M10">October</option>
                    <option id="M11">November</option>
                    <option id="M12">December</option>
                  </select>
                  <select name="Year" defaultValue="year" id="YY" style={{ padding: "10px", userSelect: "none", width: "100px" }}>
                    <option value="year" disabled>Year</option>
                    {years.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <input type="password" id="password_create_account" placeholder="Password" style={{ marginTop: "20px", marginBottom: "30px", userSelect: "none", padding: "15px", width: "350px" }} required></input>
                <a href="#create_account_submit" onClick={pushCreateAccountFormDataToBackend} style={{ position: "absolute", bottom: "5vh", left: "7vw", fontFamily: "publicsans", userSelect: "none", textDecoration: "none", border: "2px solid black", cursor: "pointer", padding: "10px 50px", borderBottomLeftRadius: "9999px", borderBottomRightRadius: "9999px", borderTopLeftRadius: "9999px", borderTopRightRadius: "9999px", color: "black" }}>Create Account</a>
              </form>
            </div>
        </div>
      </div>
      {/*Displays when #sign_in anchor is pressed.*/}
      <div style={{ display: displayLogin ? "flex" : "none", position: "absolute", zIndex: "9999", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(12, 151, 235, 0.3)" }}>
        <div className="sign_in_container" style={{ backgroundColor: "white", width: "600px", height: "650px", position: "absolute", top: "10%", zIndex: "10000", left: "30%", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", opacity: "1" }}>
            <a href="#close_login" onClick={signContainerDisplayer} style={{ fontFamily: "publicsans", textDecoration: "none", color: "black", cursor: "pointer", fontSize: "23px", paddingTop: "10px", paddingLeft: "15px", display: "inline-block" }}>X</a>
            <div className="sign_in_format" style={{ paddingLeft: "6.5rem" }}>
              <p style={{ fontFamily: "publicsans", fontSize: "30px" }}>Login to Warble</p>
              <form>
                <input type="email" id="email_sign_in" placeholder="Email" style={{ marginBottom: "20px", userSelect: "none", padding: "15px", width: "350px" }} required></input>
                <input type="password" id="password_sign_in" placeholder="Password" style={{ marginBottom: "30px", userSelect: "none", padding: "15px", width: "350px" }} required></input>
                <a href="#login_account_submit" style={{ position: "absolute", bottom: "5vh", left: "7vw", fontFamily: "publicsans", userSelect: "none", textDecoration: "none", border: "2px solid black", cursor: "pointer", padding: "10px 50px", borderBottomLeftRadius: "9999px", borderBottomRightRadius: "9999px", borderTopLeftRadius: "9999px", borderTopRightRadius: "9999px", color: "black" }}>Login</a>
              </form>
            </div>
        </div>
      </div>
    </>
  );
}

function pushCreateAccountFormDataToBackend() {
  let name = document.getElementById("name").value;
  const email = document.getElementById("email_create_account").value;
  const day = document.getElementById("DD").value;
  const month = document.getElementById("MM").value;
  const year = document.getElementById("YY").value;
  const password = document.getElementById("password_create_account").value;

  name = name.trim();

  const reqBody = {
    name,
    email,
    dateOfBirth: `${year}-${month}-${day}`,
    password
  }

  fetch(`${urls().server_url}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody)
  }
)}

export default App;
