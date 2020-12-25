import React, { useEffect, useRef } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import { debounce } from '../../utils/utils'
import './style/handle.scss'
import { useState } from 'react'
import { message } from 'antd'
import { coinLogApi } from '../../api/api'
function Handle_booked(props) {
    const listDOM = useRef();
    const wrapDOM = useRef();
    const [listHeight, setListHight] = useState(0);
    const [wrapHeight, setWrapHight] = useState(0);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);

    // 滚动到底部的事件
    const scrollFn = debounce(async (h) => {
        if (h === 0) {
            console.log('到底了');
            if (total === list.length) {
                message.warn('到底了');
                return
            }
            if (total > 10 && list.length !== total) {
                // message.loading({ content: '加载中', duration: 0 })
                // let res = await coinLogApi(page + 1);
                // if (res) {
                //     setList([...list, ...res.list]);
                //     setPage(page + 1);
                // setTotal(res.total);
                //     message.destroy();
                //     message.success('加载成功');
                // }
            }
        }
    }, 200);

    async function init() {
        message.loading({ content: '加载中', duration: 0 });
        let res = await coinLogApi();
        if (res) {
            console.log(res);
            message.destroy();
            setList(res);
        }
    }

    useEffect(() => { setListHight(listDOM.current.clientHeight) }, [list]);

    useEffect(() => {
        setWrapHight(wrapDOM.current.clientHeight);
        setListHight(listDOM.current.clientHeight);
        init();
    }, [])


    return (
        <div className='handle_booked'>
            {
                list && <div className='list_wrap' ref={wrapDOM} onScroll={(e) => {
                    scrollFn(listHeight - wrapHeight + 9 - e.target.scrollTop)
                }}>
                    <div ref={listDOM} >
                        {
                            list && list.map((e, i) => {
                                return (
                                    <div className='order_item' key={e.coin_log_id}>
                                        <p>
                                            <span>{e.nickname}</span><span>{e.create_at}</span>
                                        </p>
                                        <p>
                                            <span>{e.coin}</span><span>{e.status_message}</span>
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Handle_booked)