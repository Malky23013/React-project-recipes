

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Menu from "../style/Menu";
import '../index.css';
import { SET_RECIPE } from "../store/action";
import ShoppingList from "./shoppingList";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../App.css';
import { useLocation } from 'react-router-dom';
import { textAlign } from "@mui/system";
import Home_Page from './home_page';

function DetailsRecipe() {
  const location = useLocation();
  const state=useLocation();
  const recipe = location.state?.recipe;
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const userId = user?.Id || '';
    const dispatch = useDispatch();
  const sendList = (item) => {
    axios.post("http://localhost:8080/api/bay", item)
      .then((x) => { console.log(x.data); })
      .catch(err => console.log(err))
      alert (`${item.Name} התווסף בהצלחה לרשימת הקניות`)
  }

  const handleDelete = async (recipeToDelete) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/recipe/delete/${recipeToDelete.Id}`);
      console.log(response.data);
      const isConfirmed = window.confirm("Are you sure you want to delete this recipe?");
      if (isConfirmed) {
        console.log("Deleting...");
        navigate(`/Home_Page`);
      }
    } catch (error) {
      console.error("Error deleting recipe", error);
    }
  };
  

  function print() {
    window.print();
  }

  return (
    <>
      <Menu />
      <br />
      <div class="card mb-3" style={{width:"50%"}} >
      <h3 class="card-header">{recipe.Name}</h3>
      <div class="card-body">
  <svg
  className="d-block user-select-none"
  width="100%"
  height="200"
  aria-label="Placeholder: Image cap"
  focusable="false"
  role="img"
  preserveAspectRatio="xMidYMid slice"
  viewBox="0 0 318 180"
  style={{ fontSize: '1.125rem', textAnchor: 'middle' }}
>
  <image href={recipe.Img} width="100%" height="100%" />
</svg>
            <p className="lead">Ingredients</p>
            <h6>In order to add a code to a shopping list, please click on the desired product!</h6>
            <ul class="list-group list-group-flush">
              {recipe.Ingrident?.map((ingredient) => (
                <div className="addToListOnClick">
                <li class="list-group-item" key={ingredient.Name} onClick={() => sendList({ Id: ingredient.Id, Name: ingredient.Name, UserId: user.Id, Count: ingredient.Count })}>
                  {ingredient.Count} {ingredient.Name} {ingredient.Type}
                </li>
                </div>
              ))}
            </ul>
            <p className="lead">Instructions:</p>
            <ul className="liIngridient">
              {recipe.Instructions?.map((instruction, index) => (
                <li class="list-group-item" key={index}>
                  {instruction}
                </li>
              ))}
            </ul>
            <p className="lead">Duration:</p>
            <ul className="liIngridient">
            <li class="list-group-item">{recipe.Duration}</li>
            </ul>
            <p className="lead">Difficulty:</p>
            <ul className="liIngridient">
              <li class="list-group-item">{recipe.Difficulty}</li>
            </ul>
            </div>
            <button className="btn btn-outline-dark" onClick={() => navigate(`/shoppingList`)}>
              show List
            </button>
          
          <>
            
              {recipe.UserId === userId && (
                <>
                  <button type="button" className="btn btn-dark" onClick={() => navigate(`/addRecipe`, { state: { recipes: recipe } })} >
                    Edit
                  </button>
                  <button type="button" className="btn btn-dark" onClick={() => handleDelete(recipe)}>
                    Delete
                  </button>
                  <button class="btn btn-dark" onClick={() => { print() }}>print</button>
                </>
              )}
           
          </>
       
      </div>
    </>
  )
}

export default DetailsRecipe;

