import axios from 'axios'
import { Fragment, useEffect, useState } from 'react';

import MyPost from './myPost'
const App = () => {


    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState();
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(x => {
                setUsers(x.data)
                console.log(x.data);
            })
            .catch(err => console.error(err))
            .finally()

    }, [])


    // useEffect(() => {
    //     console.log(count)
    //     if (count < 500) {
    //         setCount(count + 1)
    //     }
    // }, [count])

    const setCountClick = () => {
        console.log(count)
        if ((count + 1) % 7 === 0) {
            setCount(count + 6)
        }
        else {
            setCount(count + 1)
        }
    }
    return <Fragment>

        <button onClick={setCountClick}>count:{count}</button>

        <ul>{users.map(x => <li>{x.name}

            {x.id == userId ? <h1>מוצג למטה</h1> :
                <button onClick={() => setUserId(x.id)}>הצג פוסטים</button>
            }

        </li>)}</ul>

        <hr />
        {userId ? <MyPost userId={userId} /> : null}
    </Fragment>
}

export default App;

