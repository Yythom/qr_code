import React, { useEffect, useState, useRef } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'

function Test() {
    // const btnRef = useRef(null)

    // const keyboardEventListener = () => {
    //     let code = '';

    //     window.addEventListener('keydown', (e) => {
    //         let value = e.key;
    //         let keyCode = e.keyCode;
    //         console.log(value, keyCode);

    //     })
    //     // $(document).on('keydown', (event) => {
    //     //     if (event.keyCode >= 48 && event.keyCode <= 57) {
    //     //         event.preventDefault();
    //     //         code += event.key;
    //     //     } else if (event.keyCode === 13) {
    //     //         console.log(code);
    //     //         code = '';
    //     //     }
    //     // });
    // };

    // function handleClick() {
    //     console.log(btnRef.current.value);
    //     keyboardEventListener()
    // }

    return (
        <div className="table_wrap">
            {/* <input type="text" ref={btnRef} />
            <button onClick={handleClick}>扫码支付</button> */}
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Test)