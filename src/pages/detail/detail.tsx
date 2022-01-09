import { useState } from 'react';

import { MaxLoanAmountReq } from '../../mocks/input';
import { MaxLoanAmountRes } from '../../mocks/output';

import './detail.less';

export default function Detail() {
    const [reqPayload] = useState(MaxLoanAmountReq);
    const [resPayload] = useState(MaxLoanAmountRes);

    return (
        <div className='detail-container'>
            <div className='left-panel'>
                <div className='child-panel'>
                    <h1>ข้อมูลส่วนตัว</h1>
                    <div className='input-block-container'>
                        {reqPayload.map(item => {
                            return (
                                <div className='input-block'>
                                    <label>{item.name}</label>
                                    <input />
                                </div>
                            )
                        })}
                    </div>
                    <button>คำนวณ</button>
                </div>
            </div>
            <div className='right-panel'>
            <div className='child-panel'>
                    <h1>ผลการคำนวณเงินกู้</h1>
                    <div className='result-block-container'>
                        {resPayload.map(item => {
                            return (
                                <div className='result-block'>
                                    <p className='bold'>{item.name}</p>
                                    <p>{item.result}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
} 