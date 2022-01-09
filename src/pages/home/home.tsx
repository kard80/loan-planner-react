import { Topic } from '../../mocks/home';
import { useState } from 'react';

import './home.less';

export default function Home() {
    const [data] = useState(Topic);
    return (
        <div className='home-container'>
            {data.map((item, index) => {
                const className = `card ${index % 2 === 0 ? 'left-card' : 'right-card'}`
                return (
                    <div className={className}>{item.name}</div>
                )
            })}
        </div>
    )
}