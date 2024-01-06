import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Add from "./add";
import * as ActionType from './store/action'

const ShowUser = () => {
    const user = useSelector(state => state.users);

    const [selectUser, setSelectedUser] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ActionType.SetUser());
    }, [])



    return <div>{user.map(x => <div>{x.name} {x.phone} 
        <button onClick={() => dispatch({ type: ActionType.DELETE_USER, userId: x.id })}>מחיקה</button>
        <button onClick={() => setSelectedUser(x)}>עריכה</button>

    </div>)}
        {selectUser ? <Add user={selectUser} /> : null}
    </div>
}

export default ShowUser;