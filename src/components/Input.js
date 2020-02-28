import React from 'react'
import  './Input.css';

const Input = (props)=> {
    return (
        <div className={props.type}>
            {props.children}
        </div>
    )
}

export default Input;