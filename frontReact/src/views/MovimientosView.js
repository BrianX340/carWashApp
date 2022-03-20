import React, { useState, useEffect } from 'react';
import AuthService from "../services/AuthService";
import UserCrudService from "../services/UserCrudService";
import { Redirect } from "react-router-dom";

import Navbar from '../components/Navbar'

export default function MovimientosView() {
    const [redirect, setRedirect] = useState(0);
    const [userReady, setUserReady] = useState(0);
    const [currentUser, setCurrentUser] = useState(0);
    const [showChargePopup, setShowChargePopup] = useState(0);
    const [concept, setConcept] = useState(0);
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [type, setType] = useState('deposit');
    const [showDeleteConfirm, setShowDeletePopUp] = useState(0);
    const [showModifyPopup, setShowModifyPopUp] = useState(0);
    const [targetOperation, setTargetOperation] = useState(0);
    const [modifyConcept, setModifyConcept] = useState('');
    const [modifyAmount, setModifyAmount] = useState('');
    const [modifyDate, setModifyDate] = useState('');

    const processData = () => {
        var currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            setRedirect(true)
        }
        setCurrentUser(currentUser)
        setUserReady(true)
    };

    useEffect(() => {
        processData()
    }, []);

    const onChangeConcept = (e) => {
        setConcept(e.target.value)
    }

    const onChangeAmount = (e) => {
        setAmount(e.target.value)
    }

    const onChangeDate = (e) => {
        setDate(e.target.value)
    }

    const onChangeType = (e) => {
        setType(e.target.value)
    }

    const chargeOperation = () => {
        UserCrudService.createOperation(concept, amount, date, type)
            .then((created) => {
                if (!created) {
                    return
                }
                window.location.reload();
            });
    }

    const showPopupDelete = (operation) => {
        setTargetOperation(operation)
        setShowDeletePopUp(1)
    }

    const deleteOperation = () => {
        UserCrudService.deleteOperation(targetOperation._id)
            .then((deleted) => {
                if (!deleted) {
                    return
                }
                setShowDeletePopUp(0)
                window.location.reload();
            });
    }

    const showPopupModify = (operation) => {
        setTargetOperation(operation)
        setModifyConcept(operation.concept)
        setModifyAmount(operation.amount)
        setModifyDate(JSON.stringify(operation.date).slice(1, 11))
        setShowModifyPopUp(1)
    }

    const updateOperation = () => {
        UserCrudService.updateOperation(targetOperation._id, modifyConcept, modifyAmount, modifyDate)
            .then((updated) => {
                if (!updated) {
                    return
                }
                setShowModifyPopUp(0)
                window.location.reload();
            });
    }

    const onModifyChangeConcept = (concept) => {
        setModifyConcept(concept)
    }

    const onModifyChangeAmount = (amount) => {
        setModifyAmount(amount)
    }

    const onModifyChangeDate = (date) => {
        setModifyDate(date)
    }

    if (redirect) {
        return <Redirect to="/login" />
    }

    return (
        <>
            {(userReady) ?
                <>
                    <Navbar />
                    <main className="column">

                        <div className="column is-8 has-background-white m-auto" id="tableTransactions">

                            <div id="tabs-with-content">

                                <div className="tabs is-centered my-4">
                                    <ul>
                                        <li className="is-size-5 mb-3">Movimientos</li>
                                    </ul>
                                </div>

                                <div id='tableMoves'>

                                    <section className="tab-content table-container has-text-centered hero is-halfheight">
                                        <table className="table is-scrollable">
                                            <thead>
                                                <tr>
                                                    <th>Concepto</th>
                                                    <th>Monto</th>
                                                    <th>Fecha</th>
                                                    <th>Tipo</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    JSON.parse(currentUser)['movements'].reverse().map(operation => {
                                                        return <tr>
                                                            <td>{operation.concept}</td>
                                                            <td>{operation.amount}</td>
                                                            <td>{JSON.stringify(operation.date).slice(1, 11)}</td>
                                                            <td>{operation.type === 'deposit' ? 'INGRESO' : 'RETIRO'}</td>
                                                            <td>
                                                                <button className="button is-primary is-outlined" onClick={() => showPopupModify(operation)}>
                                                                    <span>Modificar</span>
                                                                    <span className="icon is-small">
                                                                        <i className="fas fa-edit"></i>
                                                                    </span>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button className="button is-danger is-outlined" onClick={() => showPopupDelete(operation)}>
                                                                    <span>Eliminar</span>
                                                                    <span className="icon is-small">
                                                                        <i className="fas fa-times"></i>
                                                                    </span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </section>

                                </div>
                            </div>
                        </div>

                        <section className='chargeButtonContainer'>
                            <button className="button is-success" onClick={() => setShowChargePopup(!showChargePopup)}>Cargar Movimiento...</button>
                        </section>

                    </main>

                    <form className={showChargePopup ? 'modal viewww chargeActive popup-in' : 'chargeInactive popup-out'}>
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title has-text-centered">Cargar movimiento</p>
                                <span onClick={() => setShowChargePopup(!showChargePopup)} className="delete" aria-label="close"></span>
                            </header>

                            <section className="modal-card-body" id="sellDetailTemplateContainer">

                                <div className="field is-horizontal">
                                    <div className="field-label is-small">
                                        <label className="label">Concepto:</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <div className="control">
                                                <input
                                                    className="input is-success"
                                                    onChange={onChangeConcept}
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="field is-horizontal">
                                    <div className="field-label is-small">
                                        <label className="label">Monto:</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <div className="control">
                                                <input
                                                    className="input is-success"
                                                    onChange={onChangeAmount}
                                                    type="number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="field is-horizontal">
                                    <div className="field-label is-small">
                                        <label className="label">Fecha:</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <div className="control">
                                                <input
                                                    className="input is-success"
                                                    onChange={onChangeDate}
                                                    type="date"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="field is-horizontal">
                                    <div className="field-label is-small">
                                        <label className="label">Tipo:</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="control">
                                            <div className="select">
                                                <select value={type} className='select' onChange={onChangeType}>
                                                    <option value="deposit">INGRESO</option>
                                                    <option value="retirement">RETIRO</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </section>


                            <footer className="modal-card-foot">
                                <span className="button" onClick={() => chargeOperation()}>Cargar operacion</span>
                                <span className="button" onClick={() => setShowChargePopup(!showChargePopup)}>Volver</span>
                            </footer>
                        </div>
                    </form>

                    <div className={showDeleteConfirm ? 'popup-in viewww modal' : 'modal popup-out'}>
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <button className="delete" aria-label="close" onClick={() => setShowDeletePopUp(!showDeleteConfirm)}></button>
                            </header>
                            <section className="modal-card-body">
                                <span>Desea eliminar esta operacion?</span>
                            </section>
                            <footer className="modal-card-foot">
                                <button className="button is-danger" onClick={() => deleteOperation()}>Eliminar</button>
                                <button className="button" onClick={() => setShowDeletePopUp(!showDeleteConfirm)}>Cancelar</button>
                            </footer>
                        </div>
                    </div>

                    <div className={showModifyPopup ? 'popup-in viewww modal' : 'modal popup-out'}>
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Modificar operacion</p>
                                <button className="delete" aria-label="close" onClick={() => setShowModifyPopUp(!showModifyPopup)}></button>
                            </header>
                            <section className="modal-card-body">
                                <div className="field">
                                    <label className="label">Concepto</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input is-success" type="text" placeholder="Text input" value={modifyConcept} onChange={e => onModifyChangeConcept(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Monto</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input is-success" type="number" placeholder="Text input" value={modifyAmount} onChange={e => onModifyChangeAmount(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Fecha</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input is-success" type="date" placeholder="Text input" value={modifyDate} onChange={e => onModifyChangeDate(e.target.value)} />
                                    </div>
                                </div>
                            </section>
                            <footer className="modal-card-foot">
                                <button className="button is-info" onClick={() => updateOperation()}>Actualizar</button>
                                <button className="button" onClick={() => setShowModifyPopUp(!showModifyPopup)}>Cancelar</button>
                            </footer>
                        </div>
                    </div>

                </>
                : null}

        </>
    )
}