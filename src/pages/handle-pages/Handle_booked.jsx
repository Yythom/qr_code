import React, { useEffect } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'

import './style/handle.scss'
import { useState } from 'react'

function Handle_booked(props) {

    return (
        <div className='handle_booked'>

        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Handle_booked)