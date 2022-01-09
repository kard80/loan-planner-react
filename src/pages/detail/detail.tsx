import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FindService } from '../../mocks/home';
import { FetchData } from '../../services/http';
import { ServicePayload, ServiceRequest } from '../../types/serviceRequest';

import './detail.less';

export default function Detail() {
    let { id } = useParams();
    const [payload, setPayload] = useState<ServicePayload[]>([]);
    const [couldSend, setCouldSend] = useState<boolean>(false);
    const [data, setData] = useState<ServiceRequest>({id: '', label: '', input: [], output: []});
    const [showResult, setShowResult] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            const getData = FindService(id);
            setData(getData);
        }
    }, [id])

    const onClickCaculate = () => {
        let query = '';
        payload.forEach(item => {
            if (query !== '') {
                query += ',';
            }
            query += `${item.key}=${item.value}`
        })

        //TODO: http POST data
        FetchData('/maxLoanAmount?'+ query)
            .then(res => {
                const changedData: ServiceRequest = {...data, output: res };
                setData(changedData);
                setShowResult(true);
            })
            .catch(err => {
                console.error(err);
            })
    }

    const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>, servicePayload: ServicePayload) => {
        const { key } = servicePayload;
        let isAssignValue = false;
        const checked = payload.map(item => {
            if (item.key === key) {
                item.value = e.target.value;
                isAssignValue = true;
            }
            return item;
        })
        if (!isAssignValue) {
            checked.push({ ...servicePayload, value: e.target.value })
        }
        setPayload(checked)
        setCouldSend(!!e.target.value)
    }

    return (
        <div className='detail-container'>
            <div className='left-panel'>
                <div className='child-panel'>
                    <h1>ข้อมูลส่วนตัว</h1>
                    <div className='input-block-container'>
                        {data?.input.map(item => {
                            const inputType = item.type === 'number' ? 'number' : 'text';
                            return (
                                <div className='input-block' key={item.key}>
                                    <label>{item.label}</label>
                                    <input required type={inputType} step='1000'  onChange={e => onInputValueChange(e, item)} />
                                </div>
                            )
                        })}
                    </div>
                    <button onClick={onClickCaculate} disabled={!couldSend}>คำนวณ</button>
                </div>
            </div>
            <div className='right-panel'>
            <div className='child-panel'>
                    <h1>ผลการคำนวณเงินกู้</h1>
                    <div className='result-block-container'>
                        {showResult && data?.output.map(item => {
                            return (
                                <div className='result-block' key={item.key}>
                                    <p className='bold'>{item.label}</p>
                                    <p>{item.value}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
} 