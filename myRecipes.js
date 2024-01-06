import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Menu from "./Menu";
import './index.css';
import { SET_RECIPE } from "./store/action";
import ShoppingList from "./shoppingList";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
function MyRecipes() {
  const dispatch=useDispatch()
  const recipes=useSelector(state=>state.recipes);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    values: recipes,
  });
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/recipe")
      .then((response) => {
        dispatch({type:SET_RECIPE,payload:response.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function showList(userId) {
    console.log(userId);
    return <>{userId ? <ShoppingList userId={userId} /> : <h1>hi</h1>};</>
  }
  return (
    <div>
      <Menu />
      <br></br>
      <br></br>
      <br></br>
      <h1>All Recipes</h1>
      <div className="card-container">
      
          {recipes && recipes?.map((recipe) => ( 
            
             <Card sx={{ maxWidth: 345 }}>
            <div key={recipe.Id}>

              <CardMedia
                sx={{ height: 140 }}
                image={recipe.Img}
                title={recipe.Name}
              />

              <CardContent>
                <p>Ingredients</p>
                <ul>
                  {recipe.Ingrident?.map((ingredient) => (
                    <li key={ingredient.Name}>
                      {ingredient.Count} {ingredient.Name} {ingredient.Type}
                    </li>
                  ))}
                </ul>
                <p>Instructions:</p>
                <ul>
                  {recipe.Instructions?.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
                {/* <button onClick={() => showList(recipe.userId)}>show List</button> */}
                    <button onClick={() => navigate(`/shoppingList`)}>
                show List
              </button>
              </CardContent>
              <>
                {/* <button onClick={() => navigate(`/shoppingList/${recipe.UserId}`)}>
                  Show List
                </button> */}
                <CardActions>
                  <button onClick={() => { }/* לכתוב לוגיקה לעריכה */}>
                    Edit
                  </button>
                  <button onClick={() => { }/* לכתוב לוגיקה למחיקה */}>
                    Delete
                  </button>
                </CardActions>
              </>


              {/* ... other recipe sections */}
            </div>
          </Card>  ))}
       
       
      </div>
      </div>

  );
}

export default MyRecipes;

