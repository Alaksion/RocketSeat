import React from 'react'
import './styles.css'

export default function Header(props){
    return (
        <div className='container'> 
            <h1>{props.title}</h1>
            {props.children}
        </div>
    )
}

