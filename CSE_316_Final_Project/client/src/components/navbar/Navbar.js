import React, { useState }                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';

const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);


    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            if (reset) console.log("Logged out");
        }
    };


    return (
        <>
        <WNavItem className="nav-item" hoverAnimation="lighten">
            <WButton className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                Logout
            </WButton>
        </WNavItem >
        <WNavItem className="nav-item" hoverAnimation="lighten">
            <WButton className="navbar-options" onClick={props.setShowUpdate} wType="texted" hoverAnimation="text-primary">
                {props.user.fullName}
            </WButton>
        </WNavItem >
        </>
    );
};

const LoggedOut = (props) => {
    return (
        <>
            <WNavItem hoverAnimation="lighten" className="nav-item">
                <WButton className="navbar-create" onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary"> 
                    Create Account 
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten" className="nav-item">
                <WButton className="navbar-options" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
        </>
    );
};


const Navbar = (props) => {
    return (
        <>
            {
                props.auth === false ? 
                <div className="nav-item">
                    <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate} />
                </div>
                : 
                <LoggedIn fetchUser={props.fetchUser}  logout={props.logout} setShowUpdate={props.setShowUpdate} user={props.user}/>
            }
        </>

    );
};

export default Navbar;