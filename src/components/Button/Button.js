import React from 'react'
import  classes from './Button.module.css';

 const Button=(props)=> {
    let cls =[classes.button];
    if(props.btnType){
        cls.push(classes[props.btnType]);
    }
    if( props.children === "="){
        cls.push(classes[classes.equal]);
    }

    return (
        <div className={cls.join(' ') }
            onClick={ () => { props.handleClick(props.children);}} >
            {props.children}

        </div>
    )
}

export default Button;