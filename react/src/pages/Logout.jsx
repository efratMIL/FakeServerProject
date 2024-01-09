import './pages.css';
import { Link, NavLink } from "react-router-dom"

function Logout() {
    return (
        <>
            <h1>Log Out</h1>
            <Link
                to=".."
            >&larr; <span>Back to all vans</span></Link>
        </>
    );

} export default Logout;