import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MockNumberResult } from '../../mocks/home';

import { FindService } from '../../mocks/home';
import { ServicePayload, ServiceRequest } from '../../types/serviceRequest';

import './detail.less';

export default function Detail() {
    let { id } = useParams();
    const [payload, setPayload] = useState<ServicePayload[]>([]);
    const [data, setData] = useState<ServiceRequest>({id: '', label: '', input: [], output: []});
    const [showResult, setShowResult] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            const getData = FindService(id);
            setData(getData);
        }
    }, [id])

    const onClickCaculate = () => {
        //TODO: http POST data
        const result = MockNumberResult(payload);
        const changedData: ServiceRequest = {...data, output: result };
        setData(changedData);
        setShowResult(true);
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
                                    <input type={inputType} step='1000'  onChange={e => onInputValueChange(e, item)} />
                                </div>
                            )
                        })}
                    </div>
                    <button onClick={onClickCaculate}>คำนวณ</button>
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