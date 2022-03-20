import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

export default function Navbar(props) {
    const [showMenuMobile, setShowMenuMobile] = useState(0);
    const [showSubMenu, setShowSubMenu] = useState(1);
    const [showAdvanceOptions, setShowAdvanceOptions] = useState(1);

    const user = JSON.parse(props.user)

    const showLateralMenuToggle = () => {
        setShowMenuMobile(!showMenuMobile)
    }

    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu)
    }

    const toggleAdvanceOption = () => {
        setShowAdvanceOptions(!showAdvanceOptions)
    }

    const goChargeClient = () =>{
        props.setView('chargeClients')
        showLateralMenuToggle()
    }

    const goChargeWash = () =>{
        props.setView('chargeWash')
        showLateralMenuToggle()
    }

    const goHome = () => {
        props.setView('home')
        showLateralMenuToggle()
    }

    return (
        <>
            <header className="container is-fullwidth">
                <nav className="navbar is-info" role="navigation" aria-label="dropdown navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="#">
                            Las 5 Esquinas
                        </a>
                        <div
                            onClick={()=>showLateralMenuToggle()}
                            className="navbar-burger burger"
                            data-target="navbarExample"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div id="navbarExample" className={ showMenuMobile ? "navbar-menu is-active" : "navbar-menu"}>
                        <div className="navbar-start">
                            <a className="navbar-item" href="https://bulma.io/">
                                {(user.role)==='user' ? user.email : (user.role==='admin') ? 'Admin' : 'Invitado'}
                            </a>
                            <div className="navbar-item has-dropdown">
                                <span
                                    onClick={()=>toggleSubMenu()}
                                    className="navbar-link"
                                >
                                    Menu
                                </span>
                                <div className={showSubMenu ? "navbar-dropdown is-boxed" : "navbar-dropdown is-boxed is-hidden"}>

                                    <span
                                        onClick={()=>goHome()}
                                        className="navbar-item">
                                        Inicio
                                    </span>

                                    {(user.role === 'admin') ? 
                                        <>
                                            <span
                                                onClick={()=>goChargeClient()}
                                                className="navbar-item"
                                                >
                                                Cargar Cliente
                                            </span>

                                            <span
                                                onClick={()=>goChargeWash()}
                                                className="navbar-item"
                                                >
                                                Cargar Lavado
                                            </span>
                                        </>
                                    : ''}

                                </div>
                            </div>
                        </div>
                        {(user.role === 'admin') ? 
                            <div className="navbar-end">
                                <div className="navbar-item has-dropdown is-active">
                                    <span
                                        onClick={()=>toggleAdvanceOption()}
                                        className="navbar-link"
                                    >
                                        Avanzadas
                                    </span>
                                    <div className={showAdvanceOptions ? "navbar-dropdown is-right" : "navbar-dropdown is-right is-hidden"}>
                                        <span className="navbar-item">
                                            Gestionar gastos
                                        </span>
                                        <span className="navbar-item">
                                            Configuracion de lavados
                                        </span>
                                    </div>
                                </div>
                            </div>
                        : ''}
                        <a class = "navbar-item" href="#">
                           Cerrar sesion
                           </a>    
                        
                    </div>
                </nav>

            </header>
        </>
    )
}