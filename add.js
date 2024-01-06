import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";

import * as ActionType from './store/action'

const Add = ({ user }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState(user?.name);
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAdress] = useState(user?.address);


    return <>

        <input value={name} onChange={({ target }) => setName(target.value)} />
        <input value={phone} onChange={({ target }) => setPhone(target.value)} />
        <input value={address} onChange={({ target }) => setAdress(target.value)} />
        {!user ? <button onClick={() => dispatch({ type: ActionType.ADD_USER, newUser: { name, phone, address } })}>add</button> :
            <button onClick={() => dispatch({ type: ActionType.EDIT_USER, userObj: { ...user, name, phone, address } })}>edit</button>}

    </>
}

export default Add;