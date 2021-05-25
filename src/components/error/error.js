import React from 'react';
import './error.css'
import img from './error.jpg'

const Error = () => {
    return (
        <>
            <img src={img} alt='error'></img>
            <span>Something went wrong...</span>
        </>
    )
}

export default Error;