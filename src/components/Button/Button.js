import React from 'react'
import  classes from './Button.module.css';

 const Button=(props)=> {
    let cls =[classes.button];
    if(props.btnType==="operator"){
        cls.push(classes[props.btnType]);
    }
    if( props.btnType === "operator-equal"){
        cls.push(classes[props.btnType]);
    }

    return (
        <div className={cls.join(' ') }
            onClick={ () => { props.handleClick(props.children);}} >
            {props.children}

        </div>
    )
}

export default Button;