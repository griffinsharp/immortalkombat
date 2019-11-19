import React from 'react'
import { logout } from "../actions/session_actions";

export default function Navbar() {
    return (
        <div>
            <button onClick={logout()}>Logout</button>
        </div>
    )
}
