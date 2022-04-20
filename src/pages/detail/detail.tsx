import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Heading, Pane, Text, TextInput } from 'evergreen-ui';

import { FetchData } from '../../services/http';
import { ParameterInput, ServiceRequest } from '../../types/serviceRequest';

import './detail.less';
import { connect, RootStateOrAny } from 'react-redux';
import { spinnerAction } from '../../redux/action';
import { getJSONFromStorage } from '../../helpers/session-storage';

type props = {
    dispatch: Function
}

function Detail({ dispatch }: props) {
    let { id } = useParams();
    const navigate = useNavigate();
    const [payload, setPayload] = useState<ParameterInput[]>([]);
    const [couldSend, setCouldSend] = useState<boolean>(false);
    const [data, setData] = useState<ServiceRequest>();
    const [showResult, setShowResult] = useState<boolean>(false);

    useEffect(() => {
        const payload = getJSONFromStorage(id as string);
        if (!Object.keys(payload).length) {
            navigate('/');
            return;
        }
        setData(payload);
    }, [id, navigate])

    const onClickCaculate = async () => {
        let query = '';
        payload.forEach(item => {
            if (query !== '') {
                query += ',';
            }
            query += `${item.key}=${item.value}`
        })

        try {
            showSpinner(true);
            const res = await FetchData('/maxLoanAmount?' + query);
            const changedData: ServiceRequest = {...data as ServiceRequest, output: res };
            setData(changedData);
            setShowResult(true);
        } catch (err) {
            console.log(err);
        } finally {
            showSpinner(false);
        }
    }

    const showSpinner = (show: boolean) => {
        dispatch(spinnerAction(show));
    }

    const onInputValueChange = (e: ChangeEvent<HTMLInputElement>, servicePayload: ParameterInput) => {
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

const mapStateToProps = (state: RootStateOrAny) => {
    return {
        showSpinner: state.showSpinner
    }
}

export default connect(mapStateToProps)(Detail);