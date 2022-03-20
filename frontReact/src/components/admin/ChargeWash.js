import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default function ChargeWash(props) {
    const [redirect, setRedirect] = useState(false);
    const [currentUser, setCurrentUser] = useState(0);
    const [clients, setClients] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        processData()
    }, []);

    const processData = () => {
        var currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            setRedirect(true)
        }
        setCurrentUser(currentUser)
        setVehicles(JSON.parse(currentUser).vehicles)
    };

    const searchClient = () => {

    }

    if (redirect !== false) {
        return <Redirect to="/login" />
    }

    return (
        <>

            <main className="main mx-5 mt-5">
                <div className="control">
                    <input
                        onChange={(e)=>searchClient(e)}
                        className="input"
                        type="text"
                        placeholder="Buscar cliente..."
                        />
                </div>

                <div className="tile is-ancestor mt-5 mx-8">
                    <div className="tile">
                        {
                        typeof vehicles !== 'undefined'
                        ?
                        vehicles.map(vehicle=>{
                            <article className="tile box is-flex is-justify-content-space-between">
                                <div className='column is-fullwidth is-flex is-justify-content-flex-start is-align-items-flex-start is-flex-direction-column'>
                                    <div className='is-flex is-justify-content-center is-align-items-center'>
                                        <p className="text has-text-weight-bold">Dominio: <span className='has-text-weight-bold ml-3 has-text-link'>{vehicle.dominio}</span></p>
                                    </div>
                                    <div className='is-flex is-justify-content-center is-align-items-center'>
                                        <p className="text has-text-weight-bold">Lavados:</p>
                                        <progress className="is-link ml-3 is-block is-fullwidth" value={vehicle.lavados} max="4"></progress>
                                    </div>
                                </div>
                                <div className='is-flex is-justify-content-center is-align-items-center'>
                                    <figure className="image is-48x48 has-text-link">
                                        {
                                            vehicle.lavados<4
                                            ?
                                            <i className="fas fa-car is-size-2"></i>
                                            :
                                            <i class="fas fa-car-wash is-size-2"></i>
                                        }
                                    </figure>
                                </div>
                            </article>
                        })
                        :
                        ''
                    }
                    </div>
                </div>

            </main>

        </>
    )
}