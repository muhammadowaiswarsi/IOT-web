import React from 'react';
import { Alert } from 'react-bootstrap'

export const Error = ({ errMessage, stylee }) => {
    return (
        errMessage && errMessage.length ?
            <Alert bsStyle={stylee} >
                <p className="ft-text-alert">{errMessage}</p>
            </Alert >
            :
            ''
    )
}