import React from 'react';
import './header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a aria-label='NETFLIX'><strong>NETFLIX</strong></a>
            </div>

            <div className="header--user">
                <a href='/'>
                    <img src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' />
                </a>
            </div>
        </header>
    )
}