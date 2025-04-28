import { useState } from "react";
import urls from "./url.js";
import './static/css/fonts.css';

function App() {
  const [displayCreateAccount, setDisplayCreateAccount] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);

  const createAccountContainerDisplayer = (e) => {
    e.preventDefault();
    setDisplayCreateAccount(!displayCreateAccount);
  };

  const signContainerDisplayer = (e) => {
    e.preventDefault();
    setDisplayLogin(!displayLogin);
  };

  const years = [];
  for (let year = new Date().getFullYear(); year >= 1900; year--) {
    years.push(year);
  }

  const DDA = [];
  for (let DD = 1; DD <= 31; DD++) {
    DDA.push(DD);
  }

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'publicsans';
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          .title {
            font-size: 40px;
            padding-top: 35vh;
            padding-bottom: 2vh;
            text-align: center;
          }
          .cta-button {
            font-family: 'publicsans';
            user-select: none;
            text-decoration: none;
            border-radius: 9999px;
            padding: 10px 60px;
            font-size: 1rem;
            width: fit-content;
            text-align: center;
            display: block;
            margin: 0.5rem auto;
          }
          .primary-button {
            background-color: #0c97eb;
            color: white;
            border: 2px solid #0c97eb;
	    margin-bottom: 6%;
          }
          .secondary-button {
            color: #0c97eb;
            border: 2px solid black;
	    width: 135px;
          }
          .create_account_container,
          .sign_in_container {
            background-color: white;
            width: 90%;
            max-width: 600px;
            height: 60%;
            max-height: 90vh;
            overflow-y: auto;
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 20px;
            z-index: 10000;
            padding: 1.5rem;
          }
          .create_account_container_format,
          .sign_in_format {
            padding: 0 1rem;
          }
          .create_account_container_format input,
          .sign_in_format input,
          select {
            width: 100%;
            margin-bottom: 1rem;
            padding: 12px;
            box-sizing: border-box;
          }
          .create_account_DOB {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
          }
          .modal-overlay {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            position: fixed;
            z-index: 9999;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(12, 151, 235, 0.3);
            padding: 1rem;
          }
          .close-button {
            font-size: 1.5rem;
            cursor: pointer;
            text-decoration: none;
            color: black;
            display: inline-block;
            margin-bottom: 1rem;
          }
          .submit-button1 {
            display: inline-block;
            font-family: 'publicsans';
            text-decoration: none;
            border: 2px solid black;
            cursor: pointer;
            padding: 10px 50px;
            border-radius: 9999px;
            color: black;
            margin-top: 12.5rem;
          }	
	  .submit-button2 {
            display: inline-block;
            font-family: 'publicsans';
            text-decoration: none;
            border: 2px solid black;
            cursor: pointer;
            padding: 10px 50px;
            border-radius: 9999px;
            color: black;
            margin-top: 24.5rem;
          }
          @media (max-width: 480px) {
            .title {
              font-size: 8vw;
            }
            .create_account_container,
            .sign_in_container {
              padding: 1rem;
              height: 100%;
	      max-height: 100%;
	      top: 0;
            }
	    .modal-overlay {
	      height: 100%;
	      width: 100%;
	      padding: 0;
	    }
	    .submit-button1 {
	      margin-top: 3.5rem;
	    }
	    .submit-button2 {
	      margin-top: 3.5rem;
	    }
          }
        `}
      </style>
      <p className="title">Start warbling today</p>
      <a href="#create_account" onClick={createAccountContainerDisplayer} className="cta-button primary-button">
        Create an account
      </a>
      <a href="#sign_in" onClick={signContainerDisplayer} className="cta-button secondary-button">
        Sign in
      </a>
      <div
        style={{
          display: displayCreateAccount ? "flex" : "none",
        }}
        className="modal-overlay"
      >
        <div className="create_account_container">
          <a href="#close_create_account" onClick={createAccountContainerDisplayer} className="close-button">X</a>
          <div className="create_account_container_format">
            <p style={{ fontSize: "30px" }}>Create your account</p>
            <form>
              <input type="text" id="name" placeholder="Name" required />
              <input type="email" id="email_create_account" placeholder="Email" required />
              <p className="create_account_DOB">Date of birth</p>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                <select id="DD" defaultValue="day" required>
                  <option value="day" disabled>Day</option>
                  {DDA.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select id="MM" defaultValue="month" required>
                  <option value="month" disabled>Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select id="YY" defaultValue="year" required>
                  <option value="year" disabled>Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <input type="password" id="password_create_account" placeholder="Password" required />
              <a href="#create_account_submit" onClick={pushCreateAccountFormDataToBackend} className="submit-button1">
                Create Account
              </a>
            </form>
          </div>
        </div>
      </div>
      <div
        style={{
          display: displayLogin ? "flex" : "none",
        }}
        className="modal-overlay"
      >
        <div className="sign_in_container">
          <a href="#close_login" onClick={signContainerDisplayer} className="close-button">X</a>
          <div className="sign_in_format">
            <p style={{ fontSize: "30px" }}>Login to Warble</p>
            <form>
              <input type="email" id="email_sign_in" placeholder="Email" required />
              <input type="password" id="password_sign_in" placeholder="Password" required />
              <a href="#login_account_submit" className="submit-button2">Login</a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function pushCreateAccountFormDataToBackend() {
  let name = document.getElementById("name").value.trim();
  const email = document.getElementById("email_create_account").value;
  const day = document.getElementById("DD").value;
  const month = document.getElementById("MM").value;
  const year = document.getElementById("YY").value;
  const password = document.getElementById("password_create_account").value;

  const reqBody = {
    name,
    email,
    dateOfBirth: `${year}-${month}-${day}`,
    password
  };

  fetch(`${urls().server_url}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody)
  });
}

export default App;
