import React, { Component, PropTypes } from "react";
import Link from "../components/Link";
import Popover from "../components/Popover";

const propTypes = {
    authed: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

class Nav extends Component {
    constructor(props) {
        super(props);

    }

    /*
    Renders the popover button for the logged in user. (just the button!)
    */
    renderNavUser() {
        const { authed } = this.props;

        /*
        If there is an authenticated user, display a logout button when profile pic is clicked on.
        Else display a generic profile pic and login button when it is clicked.
        */
        let popoverButton;
        let profilePic;
        if (authed.user) {
            popoverButton = (<a href="#" onClick={this.logout}>Log out</a>);
            profilePic = (
                <img
                    className="nav-authed-image"
                    src={getImageUrl(authed.user.avatar_url)}
                />
            );
        } else {
            popoverButton = (<a href="#" onClick={this.login}>Sign in</a>);
            profilePic = (<i className="icon ion-person" />);
        }
        return (
            <Popover className="nav-user">
                <div className="nav-user-link">
                    {profilePic}
                    <i className="icon ion-chevron-down" />
                    <i className="icon ion-chevron-up" />
                </div>
                <div className="nav-user-popover popover-content">
                    <ul className="nav-user-popover-list">
                        <li className="nav-user-popover-item">
                            {popoverButton}
                        </li>
                    </ul>
                </div>
            </Popover>
        );
    }

    render() {
        const { dispatch } = this.props;

        return (
            <div className="nav">
              <div className="container clearfix">
                <div className="nav-pull-left">
                  <Link
                    className="nav-item-link active"
                    dispatch={dispatch}
                    route={{ path: ["dashboard"] }}
                  >
                    BearApps
                  </Link>
                </div>
                <div className="nav-pull-right">
                  {this.renderNavUser()}
                </div>
              </div>
            </div>
        );
    }
}

Nav.propTypes = propTypes;

export default Nav;
