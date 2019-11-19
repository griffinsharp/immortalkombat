import React from 'react'
import {Link} from 'react-router-dom'
import { logout } from "../actions/session_actions";

export default function Navbar() {
    return (
        <div>
            <Link to='/Stats'>Stats</Link>
            <button onClick={logout()}>Logout</button>
        </div>
    )
}
