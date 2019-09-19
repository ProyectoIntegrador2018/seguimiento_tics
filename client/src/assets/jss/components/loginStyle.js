/*
    Credits: Colorlib
    Link: https://colorlib.com/wp/template/login-form-v4/
*/
import './../../fonts/fonts.css';

const limiter = {
    width: '100%',
    margin: '0 auto'
};

const loginContainer = {
    width: '100%',
    minHeight: '100vh',
    display: '-webkit-box',
    display: '-webkit-flex',
    display: '-moz-box',
    display: '-ms-flexbox',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
};

const loginWrapper = {
    width: '500px',
    background: '#fff',
    borderRadius: '10px',
    overflow: 'hidden'
};

const loginTitle = {
    display: 'block',
    fontFamily: 'Poppins',
    fontSize: '39px',
    fontWeight:'700',
    color: '#333333',
    lineHeight: '1.2',
    textAlign: 'center',
}

const inputWrapper = {
    width: '100%',
    position: 'relative',
    borderBottom: '2px solid #d9d9d9',
    marginTop: '15px'
}

const buttonWrapper = {
    display: '-webkit-box',
    display: '-webkit-flex',
    display: '-moz-box',
    display: '-ms-flexbox',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
}

const buttonBackground = {
    position: 'absolute',
    zIndex: '-1',
    width: '300%',
    height: '100%',
    background: '#a64bf4',
    background: '-webkit-linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff)',
    background: '-o-linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff)',
    background: '-moz-linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff)',
    background: 'linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff)',
    top: '0',
    left: '-100%',
}

const button100 = {
    fontFamily: 'Poppins',
    fontSize: '16px',
    color: '#fff',
    lineHeight: '1.2',
    textTransform: 'uppercase',
    display: '-webkit-box',
    display: '-webkit-flex',
    display: '-moz-box',
    display: '-ms-flexbox',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
    width: '100%',
    height: '50px',
}

const button100Wrapper = {
    width: '100%',
    display: 'block',
    position: 'relative',
    zIndex: '1',
    borderRadius: '25px',
    overflow: 'hidden',
    margin: '0 auto',
    boxShadow: '0 5px 30px 0px rgba(3, 216, 222, 0.2)',
}

export { limiter, loginContainer, loginWrapper, loginTitle, inputWrapper, buttonWrapper, buttonBackground, button100, button100Wrapper };