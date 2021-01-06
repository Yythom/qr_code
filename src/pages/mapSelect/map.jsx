/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import Header from '../../component/header/header'
import './map.scss';
import { Button, message } from 'antd';
import { useHistory } from 'react-router-dom';


function _Map(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [map, setMap] = useState(null)

    /**
     * @param {loding状态} status 
     */
    function isLoadingFn(status) {
        setTimeout(() => {
            setLoading(status);
        }, 400);
    }



    // 初始化所有数据
    async function initFn() {

    }

    useEffect(() => {
        if (document.querySelector('.mapPage')) {

            document.querySelector('.mapPage').contentWindow.location.reload();
        }
        window.addEventListener('message', function (event) {
            // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
            var loc = event.data;
            if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                let location = {
                    cityname: loc.cityname,
                    address: loc.poiname,
                    address_desc: loc.poiaddress,
                    location: loc.latlng
                }
                setMap(location);
                console.log('location', location);
            }
        }, false);
        initFn();
        // eslint-disable-next-line 
    }, [])
    function onSave() {
        message.loading({
            content: '保存定位中....', duration: 0,
        })
        if (map.address !== '我的位置') {
            console.log(map);

            props.setLocaltion(map);
        }
        setTimeout(() => {
            message.destroy();
            history.goBack();
        }, 200);
    }



    return (
        <div className='map_wrap' >
            <Header />
            {
                props._localtion?.location && <> <div className='select_wrap'>
                    <iframe className='mapPage' frameBorder={0}
                        src={`https://apis.map.qq.com/tools/locpicker?search=1&type=1&coord=${props._localtion.location}&key=4I7BZ-HIS3P-ELWD3-L2R4G-MOYBJ-OLBXZ&referer=myapp`}>
                    </iframe>

                </div>
                    <div className='btns'>
                        <Button onClick={() => { history.goBack() }}>取消</Button>
                        <Button type="primary" onClick={onSave}>保存</Button>
                    </div>
                </>
            }

        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Map)