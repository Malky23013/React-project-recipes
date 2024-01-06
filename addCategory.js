import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import './index.css'
import Menu from "./Menu";
import { SET_CAT } from "./store/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { SET_RECIPE } from "./store/action";
const AddCategory = () => {
  
  const dispatch=useDispatch();
  const isCategory=useSelector(state=>state.Cat);
  const recipes=useSelector(state=>state.recipes);
  const navigate=useNavigate()
  const [newCategory, setNewCategory] = useState(''); 
  const [categories, setCategories] = useState([{}
  ]); 
  // פונקציה שיוצרת את הודעת התראה על כך שקטגוריה שהמשתמש הכניס קיימת כבר
  //
  console.log(recipes)
  function showAlert(message) {
    const container = document.createElement("div");
    container.className="AlertContainer"
    container.style.position = "fixed";
    container.style.top = 0;
    container.style.left = 0;
    container.style.textAlign="center";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.zIndex = 1000;
    container.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  
    const content = document.createElement("div");
    content.style.position = "absolute";
    content.style.top = "50%";
    content.style.left = "50%";
    content.style.transform = "translate(-50%, -50%)";
    content.style.width = "400px";
    content.style.padding = "20px";
    content.style.backgroundColor = "white";
    content.style.borderRadius = "10px";
  
    const header = document.createElement("h1");
    header.textContent = message;
  
    const button = document.createElement("button");
    button.textContent = "ok";
   
    button.addEventListener("click", () => {
      container.remove();
    });
  
    content.appendChild(header);
    content.appendChild(button);
    container.appendChild(content);
  
    document.body.appendChild(container);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/category",
        { Name: newCategory }
      );
      setCategories([...categories, response.data]);
      setNewCategory('');
    } catch (error) {
      console.error(error);
      showAlert(" Category Exists, try again!");
    }
  };

  useEffect(() => {
    
    axios
      .get("http://localhost:8080/api/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
      axios
      .get("http://localhost:8080/api/recipe")
      .then((response) => {
        dispatch({type:SET_RECIPE,payload:response.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); 

function OnClickCat(cat){
dispatch({type:SET_CAT,Cat:cat});
}
function details(){}
  return (
    <>
      <Menu/>
      <br></br>
      <br></br>
      <br></br>

      <div className="category-container">
      <h1 className="category-header"> My Categories</h1>
      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat.Id} className="category-item" onClick={()=>{OnClickCat(cat)}}>
            <h3 className="category-name">{cat.Name} </h3>
          </li>
        ))}
      </ul>

      <h2 className="add-category-header"> Add Category</h2>
      <form className="add-category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="categoryName"
          className="category-input"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
         
        />
        <br></br>
        <br></br>
        <button className="category-submit" type="submit">Add</button>
      </form>
    </div>
    <div className="card-container2">
      
      {recipes && recipes?.map((recipe) => ( 
     ( !isCategory||(isCategory.Id===recipe.CategoryId))&&
         <Card onclick={()=>{details(recipe)}} sx={{ maxWidth: 345 }}>
        <div key={recipe.Id}>

          <CardMedia
            sx={{ height: 140 }}
            image={recipe.Img}
            title={recipe.Name}
          />

          <CardContent>
            {/* <p>Ingredients</p> */}
            {/* <ul>
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
            </ul> */}
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
    </>
  );
};

export default AddCategory;

