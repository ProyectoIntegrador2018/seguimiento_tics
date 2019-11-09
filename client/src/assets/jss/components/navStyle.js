const sidenavFixed = {
    overflow: 'hidden',
    boxShadow: 'none',
    borderRight:'1px solid rgba(0,0,0,0.14)',
    left: '0',
    position: 'fixed',
    height: '100%',
    width: '300px'
};

const sidenavItem = {
    lineHeight: '44px',
    display: 'block',
    color: 'rgba(0,0,0,0.87)',
    ":hover": {
        backgroundColor: "red",
    }
};

export { sidenavFixed, sidenavItem };