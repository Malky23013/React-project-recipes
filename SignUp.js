import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Header from './Header';
import { useNavigate } from "react-router-dom";

const schema = yup.object({
    userName: yup.string().required("please enter a valid name "),
    name: yup.string().required("please enter a valid name "),
    phone: yup.string().min(9).required("please enter a valid phone "),
    tz: yup.string().min(9).max(9).required("please enter a valid tz "),
    email: yup.string().email().required("please enter a valid email "),
    password: yup.string().min(7, "at least 7 numbers").required("please enter a valid password "),
}).required("must fill form");

const SignUp=()=>{
   

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const dispatch=useDispatch();

const onSubmit = (values)=>
{
    axios.post("http://localhost:8080/api/user/sighin",{Username:values.userName,Password:values.password,Name:values.name,Phone:values.phone,Email:values.email,Tz:values.tz})
    .then(x =>{
        alert("נרשמת");
       console.log(x.data);
        dispatch({type:"SET_USER",payload: x.data })
       
    }).catch(err=>console.error(err));
};

    return(
        <>
        <Header/>
        <br/>
        <br/>
        <br/>
        <br/>
         <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("userName")} placeholder="user name" />
            <p>{errors.userName?.message}</p>
            <input {...register("name")} placeholder="name" />
            <p>{errors.name?.message}</p>
            <input {...register("phone")} placeholder="phone"/>
            <p>{errors.phone?.message}</p>
            <input {...register("email")} placeholder="email"/>
            <p>{errors.email?.message}</p>
            <input {...register("tz")} placeholder="tz" />
            <p>{errors.tz?.message}</p>
            <input {...register("password")} placeholder="password"/>
            <p>{errors.password?.message}</p>           
            <button type="submit">שלח</button>
        </form>
        </>
    )
}
export default SignUp;