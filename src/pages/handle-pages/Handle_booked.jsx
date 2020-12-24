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
    const [list, setList] = useState([
        {
            name: '名1',
            id: '101',
            time: '2019-9-12  13：12：21',
            status: 1,
            coin: '999'
        }, {
            name: '名1',
            id: '101',
            time: '2019-9-12  13：12：21',
            status: 1,
            coin: '999'
        }, {
            name: '名1',
            id: '101',
            time: '2019-9-12  13：12：21',
            status: 1,
            coin: '999'
        }, {
            name: '名1',
            id: '101',
            time: '2019-9-12  13：12：21',
            status: 1,
            coin: '999'
        }, {
            name: '名1',
            id: '101',
            time: '2019-9-12  13：12：21',
            status: 1,
            coin: '999'
        }, {
            name: '名1',
            id: '101',
            time: '2019-9-12  13：12：21',
            status: 1,
            coin: '999'
        }, {
            name: '名1',
            id: '101',
            time: '2019-9-12  13：12：21',
            status: 1,
            coin: '999'
        }, {
            name: '名1',
            id: '101',
            time: '2019-9-12  13：12：21',
            status: 1,
            coin: '999'
        }, {
            name: '名1',
            id: '101',
            time: '2019-9-12  13：12：21',
            status: 1,
            coin: '999'
        },
    ]);

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
                // let res = await addressListApi(page + 1);
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

    useEffect(() => { setListHight(listDOM.current.clientHeight) }, [list]);

    useEffect(() => {
        setWrapHight(wrapDOM.current.clientHeight);

        setListHight(listDOM.current.clientHeight);
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
                                    <div className='order_item' key={e.id + i}>
                                        <p>
                                            <span>{e.name}</span><span>{e.time}</span>
                                        </p>
                                        <p>
                                            <span>{e.coin}</span><span>{e.status}</span>
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