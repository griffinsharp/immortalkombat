import React from 'react'

//components
import Navbar from './Navbar'

export default function Profile() {
    return (
        <>
        <div className='container'>
           <Navbar /> 
           <input type="text" placeholder='code' name='code' />
           <button className='btn btn-flat'>Go!</button>
        </div>
        </>
    )
}

