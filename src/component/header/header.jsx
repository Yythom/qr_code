import React, { useEffect, useState } from 'react';
// import { getDetailByShortTable } from '../../api/api';
import './header.scss'
import { useHistory, withRouter } from 'react-router-dom';
function Header(props) {
    const [color, setColor] = useState('');
    const history = useHistory();
    const jump = () => {
        // console.log(history, 1);
        history.goBack();
    }
    useEffect(() => {
        // console.log(props.location.pathname.split('/')[1]);
        if (props.location.pathname.indexOf('home') !== -1) {
            setColor('#fff');
        } else {
            setColor('rgb(9,44,76)');
        }
        // eslint-disable-next-line
    }, [props.location.pathname.split('/integral')[1]])
    return (
        <div className='header_title'>
            {
                color === '#fff'
                    ? <svg t="1608546256046" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8139" width="16" height="16"><path d="M714.41600001 960.294c13.02300001-12.711 32.599-31.816 55.38599999-54.054C637.309 776.332 505.577 647.16 373.099 517.265c135.675-133.566 267.109-262.952 398.507-392.311-25.771-24.939-45.768-44.286-63.432-61.382-150.09299999 147.081-301.99 295.93-455.779 446.632C407.779 661.576 560.566 810.416 714.41600001 960.294z" fill="#ffffff" p-id="8140"></path></svg>
                    : <svg t="1608535595375" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5139" width="16" height="16"><path d="M383.88508444 512.27989333l332.40746667-332.41315555c13.96963556-13.96053333 13.96963556-36.62051556 0-50.58218667-13.96053333-13.96963556-36.62051556-13.96963556-50.58218667 0l-357.70254222 357.70481778c-13.97304889 13.96053333-13.97304889 36.62051556 0 50.58218667l357.70368 357.70368c6.98254221 6.98595556 16.13710222 10.48007111 25.29052445 10.48007111s18.30912-3.49411556 25.29052444-10.48007111c13.97304889-13.96053333 13.97304889-36.62051556 0-50.58218667l-332.40974222-332.41429333z" p-id="5140"></path></svg>
            }
            <span style={{ color }} onClick={jump}>返回</span>
        </div>
    );
}
export default withRouter(Header);
