import { Link } from 'react-router-dom';
import { Services } from '../../mocks/home';
import { useState } from 'react';
import { Button, Pane } from 'evergreen-ui';

import './home.less';

export default function Home() {
    const [data] = useState(Services);
    return (
        <Pane className='home-container'>
            {data.map((item) => {
                const input = `/detail/${item.id}`;
                return (
                    <Link to={input} key={item.id}>
                        <Button className='card'>{item.label}</Button>
                    </Link>
                )
            })}
        </Pane>
    )
}