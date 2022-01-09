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
                        {/* <div className='input-block'>
                            <label>วงเงินที่ต้องการกู้</label>
                            <input />
                        </div> */}
                        {/* <div className='input-block'>
                            <label>ระยะเวลาที่ต้องการกู้</label>
                            <input />
                        </div>
                        <div className='input-block'>
                            <label>อัตราดอกเบี้ย</label>
                            <input />
                        </div> */}
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
                        {/* <div className='result-block'>
                            <h3>ยอดผ่อนชำระต่อเดือน</h3>
                            <p>20,000.00</p>
                        </div> */}
                        {/* <div className='result-block'>
                            <h3>วงเงินกู้สูงสุด</h3>
                            <p>1,000,000.00</p>
                        </div>
                        <div className='result-block'>
                            <h3>รายได้ขั้นต่ำ</h3>
                            <p>50,000.00</p>
                        </div> */}
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
} 