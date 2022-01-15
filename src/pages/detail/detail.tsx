import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Heading, Pane, Text, TextInput } from 'evergreen-ui';

import { FindService } from '../../mocks/home';
import { FetchData } from '../../services/http';
import { ServicePayload, ServiceRequest } from '../../types/serviceRequest';

import './detail.less';

export default function Detail() {
    let { id } = useParams();
    const [payload, setPayload] = useState<ServicePayload[]>([]);
    const [couldSend, setCouldSend] = useState<boolean>(false);
    const [data, setData] = useState<ServiceRequest>({id: '', label: '', input: [], output: [], options: []});
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
        <Pane className='detail-container'>
            <Card className='left-panel'>
                <Pane className='child-panel'>
                    <Heading>ข้อมูลส่วนตัว</Heading>
                    <Pane className='input-block-container'>
                        {data?.input.map(item => {
                            const inputType = item.type === 'number' ? 'number' : 'text';
                            return (
                                <Pane className='input-block' key={item.key}>
                                    <Text>{item.label}</Text>
                                    <TextInput required type={inputType} step='1000' min='0' width={'100%'}  onChange={(e: any) => onInputValueChange(e, item)} />
                                </Pane>
                            )
                        })}
                    </Pane>
                    <Button appearance='primary' onClick={onClickCaculate} disabled={!couldSend}>คำนวณ</Button>
                </Pane>
            </Card>
            <Card className='right-panel'>
                <Pane className='child-panel'>
                    <Heading>ผลการคำนวณเงินกู้</Heading>
                    <Pane className='result-block-container'>
                        {showResult && data?.output.map(item => {
                            return (
                                <Pane className='result-block' key={item.key}>
                                    <Text className='bold'>{item.label}</Text>
                                    <Text>{item.value}</Text>
                                </Pane>
                            )
                        })}
                    </Pane>
                </Pane>
            </Card>
        </Pane>
    )
} 