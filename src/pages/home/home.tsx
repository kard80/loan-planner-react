import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Pane } from 'evergreen-ui';

import './home.less';
import { ServiceRequest } from '../../types/serviceRequest';
import { SessionStorageKey } from '../../constant/constant';
import { FetchData } from '../../services/http';

export default function Home() {
    const [data, setData] = useState<ServiceRequest[]>([]);

    useEffect(() => {
        fetchFeature();
    }, [])
    
    useEffect(() => {
        setSessionStorage(data);
    }, [data])

    
    const fetchFeature = async () => {
        const result = await FetchData('/home-feature', {disableToaster: true});
        setData(result);
    }

    const setSessionStorage = (data: ServiceRequest[]) => {
        const stringData = JSON.stringify(data);
        sessionStorage.setItem(SessionStorageKey, stringData);
    }

    return (
        <Pane className='home-container'>
            {data.map((item) => {
                let input = `/detail/${item.id}`;
                if (item.options.includes('planner')) {
                    input = `/planner/${item.id}`;
                }
                return (
                    <Link to={input} key={item.id} state={item.input}>
                        <Button className='card'>{item.label}</Button>
                    </Link>
                )
            })}
        </Pane>
    )
}