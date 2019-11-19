/*
    Credits: Colorlib
    Link: https://colorlib.com/wp/template/login-form-v4/
*/
import "./../../fonts/fonts.css";

const limiter = {
  width: "100%",
  margin: "0 auto",
  backgroundColor: "#d9d9d9"
};

const searchContainer = {
  width: "100%",
  minHeight: "60vh",
  justifyContent: "center",
  paddingTop: "50px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  flexWrap: "wrap",
  display: "flex",
  fallbacks: [
    { display: "-webkit-box" },
    { display: "-webkit-flex" },
    { display: "-moz-box" },
    { display: "-ms-flexbox" }
  ]
};

const dataTable = {
  position: "relative",
  maxWidth: "100vw"
};

const tableStyle = {
  borderSpacing: "0px",
  background: "#fff",
  boxShadow: "0 1px 0 0 rgba(22, 29, 37, 0.05)",
  width: "100%"
};

const cell = {
  border: "1px solid #f4f6f8",
  padding: "4px",
  textAlign: "left",
  verticalAlign: "top"
};

const header = {
  extend: "cell"
};

const fixed = {
  extend: "cell",
  position: "absolute",
  top: "auto",
  left: "0",
  width: "145px",
  whiteSpace: "unset",
  textAlign: "left",
  backfaceVisibility: "hidden",
  background: "#fff",
  wordWrap: "break-word",
  wordBreak: "break-word",
  overflowWrap: "break-word"
};

const fixedHeader = {
  extend: ["fixed", "header"]
};

const scrollContainer = {
  overflowX: "auto",
  marginLeft: "145px"
};

export {
  limiter,
  searchContainer,
  dataTable,
  tableStyle,
  cell,
  header,
  fixed,
  fixedHeader,
  scrollContainer
};
