import "../fonts/fonts.css";

const title = {
  display: "block",
  fontFamily: "Poppins",
  fontSize: "39px",
  fontWeight: "700",
  color: "#333333",
  lineHeight: "1.2",
  textAlign: "center"
};

const buttonWrapper = {
  display: "flex",
  fallbacks: [
    { display: "-webkit-box" },
    { display: "-webkit-flex" },
    { display: "-moz-box" },
    { display: "-ms-flexbox" }
  ],
  flexWrap: "wrap",
  justifyContent: "center"
};

const button100 = {
  fontFamily: "Poppins",
  fontSize: "16px",
  backgroundColor: "#bd59d4",
  lineHeight: "1.2",
  textTransform: "uppercase",
  display: "flex",
  fallbacks: [
    { display: "-webkit-box" },
    { display: "-webkit-flex" },
    { display: "-moz-box" },
    { display: "-ms-flexbox" }
  ],
  justifyContent: "center",
  alignItems: "center",
  padding: "0 20px",
  width: "100%",
  height: "50px",
  color: "white",
  borderColor: "transparent"
};

const button100Wrapper = {
    width: '50%',
    display: 'block',
    position: 'relative',
    borderRadius: '25px',
    overflow: 'hidden',
    margin: '0 auto',
    boxShadow: '0 10px 30px 0px rgba(189, 89, 212, 0.5)',
    marginTop: '6%',
    marginBottom: '50px'
}

const invalidInput = {
  color: "#dc3545",
  fontSize: "70%",
  textTransform: "uppercase"
};

export { title, button100, buttonWrapper, button100Wrapper, invalidInput };
