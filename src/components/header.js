import "../static/css/fonts.css";

function Header() {
  return (
    <>
      <div style={{ width: '100%', height: '80px', display: "flex", alignItems: "center" }}>
        <div style={{ paddingLeft: "2rem" }}>
          <div>
            <p style={{ fontSize: "22px", fontFamily: "publicsans" }}>Warble</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;
