import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Menu from "../style/Menu";
// import '../index.css';
import { SET_RECIPE } from "../store/action";
import ShoppingList from "./shoppingList";
import { useNavigate } from 'react-router-dom';

import MyCard from '../style/card';

import '../App.css';
import { useDispatch, useSelector } from "react-redux";
function MyRecipes() {
  const dispatch = useDispatch()
  const recipes = useSelector(state => state.recipes);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    values: recipes,
  });
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/recipe")
      .then((response) => {
        dispatch({ type: SET_RECIPE, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function showList(userId) {
    console.log(userId);
    return <>{userId ? <ShoppingList userId={userId} /> : <h1>hi</h1>};</>
  }
  function details(recipe) {
    const link = `/detailsRecipe/${recipe.Id}`;
    // navigate(`/detailsRecipe/${recipe.Id}`, { state: { recipe } });
  }
  return (
    <div>
      <Menu />
      <br></br>
      <h1>All Recipes</h1>
      <div className="card-container">
        {recipes && recipes?.map((recipe) => (
            <MyCard recipe={recipe} />
        ))}
      </div>
    </div>

  );
}

export default MyRecipes;
// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import Menu from "./Menu";
// import './index.css';
// import { SET_RECIPE } from "./store/action";
// import ShoppingList from "./shoppingList";
// import { useNavigate } from 'react-router-dom';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import './App.css';
// import { useDispatch, useSelector } from "react-redux";
// function MyRecipes() {
//   const dispatch = useDispatch()
//   const recipes = useSelector(state => state.recipes);
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     values: recipes,
//   });
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/recipe")
//       .then((response) => {
//         dispatch({ type: SET_RECIPE, payload: response.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   function showList(userId) {
//     console.log(userId);
//     return <>{userId ? <ShoppingList userId={userId} /> : <h1>hi</h1>};</>
//   }
//   return (
//     <div>
//       <Menu />
//       <br></br>
//       <br></br>
//       <br></br>
//       <h1>All Recipes</h1>
//       <div className="cardContainer">

//         {recipes && recipes?.map((recipe) => (

//           <div key={recipe.Id}>
//             <img src={recipe.Img} alt={recipe.Name} />
//             <h1>{recipe.Name}</h1>
//             <h3>Ingredients</h3>
//             <ul>
//               {recipe.Ingrident?.map((ingredient) => (
//                 <li key={ingredient.Name}>
//                   {ingredient.Count} {ingredient.Name} {ingredient.Type}
//                 </li>
//               ))}
//             </ul>
//             <h3>Instructions:</h3>
//             <ul>
//               {recipe.Instructions?.map((instruction, index) => (
//                 <li key={index}>{instruction}</li>
//               ))}
//             </ul>
//             <h3>Duration:</h3>
//             <ul>
//               {recipe.Duration}
//             </ul>
//             <h3>Difficulty:</h3>
//             <ul>
//               {recipe.Difficulty}
//             </ul>
//             {/* <button onClick={() => showList(recipe.userId)}>show List</button> */}
//             <button onClick={() => navigate(`/shoppingList`)}>
//               show List
//             </button>

//             <>
//               {/* <button onClick={() => navigate(`/shoppingList/${recipe.UserId}`)}>
//                   Show List
//                 </button> */}

//               <button onClick={() => { }/* לכתוב לוגיקה לעריכה */}>
//                 Edit
//               </button>
//               <button onClick={() => { }/* לכתוב לוגיקה למחיקה */}>
//                 Delete
//               </button>
//             </>
//             {/* ... other recipe sections */}
//           </div>
//         ))}
//       </div>
//     </div>

//   );
// }

// export default MyRecipes;


