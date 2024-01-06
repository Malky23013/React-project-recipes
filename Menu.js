import React, { Fragment } from "react";
import './bootstrap.min.css';
import { Link, useSearchParams } from 'react-router-dom';
import './App.css';
import * as ActionType from './store/action'
import { useSelector } from "react-redux";
const Menu = () => {
 const userId=useSelector(state=>state.user.Id);
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div class="container-fluid">
          {/* <a class="navbar-brand" href="#">Navbar</a> */}
          <Link class="navbar-brand" to="/home_page" > home Page </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <Link class="nav-link active" to="/addCategory">Add Category
                  <span class="visually-hidden">(current)</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/myRecipes"> My Recipes </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/addRecipe">Add Recipe</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={`/shoppingList`}>My Shopping List</Link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Separated link</a>
                </div>
              </li>
            </ul>
            <form class="d-flex">
              <input class="form-control me-sm-2" type="search" placeholder="Search"></input>
              <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Menu;

