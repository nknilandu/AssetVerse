import { NavLink } from "react-router";
import logo from "../../src/assets/logo.png"

const Logo = () => {
    return (
        <NavLink to="/">
            <img src={logo} alt="logo" />
        </NavLink>
    );
};

export default Logo;