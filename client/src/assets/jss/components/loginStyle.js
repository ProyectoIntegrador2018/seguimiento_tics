/*
    Credits: Colorlib
    Link: https://colorlib.com/wp/template/login-form-v4/
*/
import "./../../fonts/fonts.css";

const limiter = {
  width: "100%",
  margin: "0 auto"
};

const loginContainer = {
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  fallbacks: [
    { display: "-webkit-box" },
    { display: "-webkit-flex" },
    { display: "-moz-box" },
    { display: "-ms-flexbox" }
  ],
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  padding: "15px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover"
};

const loginWrapper = {
  width: "500px",
  marginLeft: "-300px",
  background: "#fff",
  borderRadius: "10px",
  overflow: "hidden"
};

const inputWrapper = {
  width: "100%",
  position: "relative",
  borderBottom: "2px solid #d9d9d9",
  marginTop: "15px"
};

const inputStyle = {
  marginBottom: "10px"
};

export { limiter, loginContainer, loginWrapper, inputWrapper, inputStyle };
