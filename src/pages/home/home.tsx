import { Link } from 'react-router-dom';
import { Services } from '../../mocks/home';
import { useState } from 'react';

import './home.less';

export default function Home() {
    const [data] = useState(Services);
    return (
        <div className='home-container'>
            {data.map((item) => {
                const input = `/detail/${item.id}`;
                return (
                    <Link to={input} key={item.id}>
                        <div className='card'>{item.label}</div>
                    </Link>
                )
            })}
        </div>
    )
}