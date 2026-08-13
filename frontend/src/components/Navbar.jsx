import { NavLink } from "react-router-dom";

const Navbar = () =>{

    return (
        <div>
            <li>
                <ul>
                    <NavLink to="/">Home</NavLink>
                </ul>
                <ul>
                    <NavLink to="/create">Create Task</NavLink>
                </ul>
            </li>
        </div>
    )
}

export default Navbar;