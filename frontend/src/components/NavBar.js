import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <nav>
            <div>
                <h1>App Name</h1>
                <div>
                    {user ? (
                        <>
                            <Link to="/">Dashboard</Link>
                            <button onClick={logoutUser}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;