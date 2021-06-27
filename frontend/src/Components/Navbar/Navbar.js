import './Navbar.css'
import React, {useEffect} from 'react'
import {MenuItems} from './MenuItems'
import { ReactComponent as Logo } from './logo_white.svg';


export default function Navbar() {
   
    return (
        <>
            <div class="sticky">
            <nav className='navbar shadow'>
                <ul className='nav-menu'>
                    {MenuItems.map((item, index)=> {
                        return (
                            <li key={index} className="nav-item">
                                <a className={item.cName} href={item.url}>
                                {item.title} <i className="fas fa-caret-down" />
                                </a>
                            </li>
                        )
                    })}
                </ul>

            </nav>
            </div>

        </>
    )
}
