import React, { useState, useEffect } from 'react';
import AdminCrudService from "../../services/AdminCrudService";

export default function ChargeClients(props) {
    const [vehicles, setVehicles] = useState([]);
    const [clientName, setClientName] = useState('');
    const [clientWsp, setClientWsp] = useState('')
    const [clientDomain, setClientDomain] = useState('');
    const [clientVehicle, setClientVehicle] = useState('');
    const [clientNameValidation, setClientNameValidation] = useState(1);
    const [clientWspValidation, setClientWspValidation] = useState(1);

    const [domainRegistered, setDomainRegistered] = useState(0)


    const regexName = (name) => {
		//eslint-disable-next-line
        let regexName = /^[a-zA-Z]{2,}$/
        setClientNameValidation(regexName.test(name))
	}

	const onChangeName = (e) => {
        regexName(e.target.value)
		setClientName(e.target.value)
	}

    const onChangeWsp = (e) => {
        let value = e.target.value
        //eslint-disable-next-line
        let regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/
        let passed = regexPhone.test(value)
        console.log(passed)
        if(value.length < 10){
            setClientWsp(value)
            setClientWspValidation(1)
        }else{
            if(passed){
                setClientWsp(value)
                setClientWspValidation(1)
            }else{
                setClientWspValidation(0)
            }
        }
    }

    const onChangeDomain = (e) => {
        setClientDomain(e.target.value.toUpperCase())
    }

    const chargeVehicle = () => {
        let isRegistered = false;
        vehicles.forEach(vehicle => {
            if(vehicle.dominio === clientDomain){
                isRegistered = true
            }
        });

        if(isRegistered){
            setDomainRegistered(1)
            return
        }
        setDomainRegistered(0)
        setVehicles(
            [
                ...vehicles,
                {
                    dominio:clientDomain,
                    vehicle:clientVehicle
                }
            ]
        )
        setClientDomain('')
    }

    const submitClient = () => {
        AdminCrudService.createClient(clientName, clientWsp, vehicles)
            .then(created=>{
                if(!created){
                    return
                }
                console.log('creado')
            })
    }

    return (
        <>

            <main className="main mx-5 mt-5">

                <div className="field">
                    <label className="label">Nombre:</label>
                    <div className="control">
                        <input
                            onChange={e=>onChangeName(e)}
                            className={clientNameValidation ? "input is-success" : "input is-danger"}
                            type="text"
                            placeholder="Nombre..."
                            value={clientName}
                            />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Whatsapp:</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            onChange={e=>onChangeWsp(e)}
                            className={clientWspValidation ? "input is-success" : "input is-danger"}
                            type="text"
                            placeholder="Celular Nº"
                            value={clientWsp}
                            />
                        <span className="icon is-small is-left">
                            <i className="fas fa-mobile"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-exclamation-triangle"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Dominios</label>
                    <p className="help">Sin espacios ni guiones!</p>
                    <div className="tags is-justify-content-center mt-3">
                        {vehicles.map(vehicle=>{
                            return <div className="tag">{vehicle.dominio}</div>
                        })}
                    </div>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            onChange={e=>onChangeDomain(e)}
                            className="input is-success"
                            type="text"
                            placeholder="Dominio..."
                            value={clientDomain}
                            />
                        <span className="icon is-small is-left">
                            <i className="fas fa-car"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </div>
                    <div
                        className="control mt-4">
                        <label className="radio">
                            <input
                                onChange={()=>setClientVehicle('car')}
                                type="radio"
                                name="vehicle"
                                />
                            Auto
                        </label>
                        <label className="radio">
                            <input
                                onChange={()=>setClientVehicle('motorcycle')}
                                type="radio"
                                name="vehicle"
                                />
                            Moto
                        </label>
                        <label className="radio">
                            <input
                                onChange={()=>setClientVehicle('van')}
                                type="radio"
                                name="vehicle"
                                />
                            Camioneta
                        </label>
                        <label className="radio">
                            <input
                                onChange={()=>setClientVehicle('truck')}
                                type="radio"
                                name="vehicle"
                                />
                            Camion
                        </label>
                    </div>

                    <p 
                        className={domainRegistered ? "help is-danger":"is-hidden"}
                    >Este dominio se encuentra registrado.</p>

                    <div className="buttons mt-3 mb-6">
                        <button
                            onClick={()=>chargeVehicle()}
                            className="button is-link is-small m-auto"
                        >Cargar</button>
                    </div>
                </div>

                <div className="field is-grouped mt-5">
                    <div className="control m-auto">
                        <button
                            onClick={()=>submitClient()}
                            className="button is-link"
                            >Guardar</button>
                    </div>
                    <div className="control m-auto">
                        <button className="button is-link is-light">Cancelar</button>
                    </div>
                </div>

            </main>

        </>
    )
}