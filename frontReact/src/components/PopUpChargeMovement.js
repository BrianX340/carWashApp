import React, { Component } from 'react'

export default class PopUpChargeMovement extends Component {

    toogleHidePopUp = () => {
        document.getElementById('popupCharge').className = 'chargeActive popup-in'
    }

    render() {
        return <>
            <section id='popupCharge' className={this.props.show ? 'chargeActive popup-in' : 'chargeInactive popup-out'}>
                <span className='closePopupButton' onClick={this.toogleHidePopUp} href="">CERRAR</span>
                <div className='inputsContainerPopup'>

                    <div>
                        <label htmlFor="">concepto</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">concepto</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">concepto</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">concepto</label>
                        <input type="text" name="" id="" />
                    </div>

                </div>
                <button>cargar</button>
            </section>
        </>
    }


}
