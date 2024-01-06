import React, { useState } from "react";
import Login from "./login";
import SignIn from "./signIn";
// import './App.css';
import './bootstrap.min.css';
import { Link } from "react-router-dom";
const Hello = () => {
  const [isActive, setIsActive] = useState(false); 
  const [isActive2, setIsActive2] = useState(false); 
  const [toShow, setToShow] = useState(false); 
  const [toShow2, setToShow2] = useState(false); 
  return (
    <>
 <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" onClick={() => {setIsActive(true);setToShow(true)}}>Login</a>
            <span class="visually-hidden">(current)</span>
        
        </li>
        <li class="nav-item">
          <a class="nav-link active" onClick={() => {setIsActive2(true);setToShow2(true)}}>Sign In</a>
            <span class="visually-hidden">(current)</span>
        
        </li>
       
       
      </ul>
      <form class="d-flex">
        <input class="form-control me-sm-2" type="search" placeholder="Search"/>
        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
{isActive&&!toShow2?<Login /> : null} 
{isActive2&&!toShow ? <SignIn /> : null} 
</>
  );
};

export default Hello;
