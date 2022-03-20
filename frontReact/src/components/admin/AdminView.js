import React, { useState, useEffect } from 'react';

import ChargeClients from './ChargeClients';
import ChargeWash from './ChargeWash';
import Home from './Home'

export default function AdminHome(props) {
    
    return (
            <>
            {props.view === 'home'?
                <Home/>
            :
                props.view==='chargeClients' ? 
                    <ChargeClients/>
                :
                    props.view==='chargeWash' ? 
                        <ChargeWash/>
                    :
                        ''
            }
            </>
            )
}




