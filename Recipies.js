import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import RecipyDetails from "./RecipyDetails"
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import './Recipies.css'
import Category from "./Category"
import Header from "./Header"

const Recipies=()=>{
    const navigate=useNavigate();
    const recipes=useSelector(state=>state?.recipes);
    const selectedCategory=useSelector(state=>state.SelectedCategory)
    const dispatch=useDispatch();
   useEffect(function(){
axios.get("http://localhost:8080/api/recipe")
.then(
    (x)=>{console.log(x.data);
    dispatch({type: "GET_RECIPIES",payload:x.data})}
).catch(err=>console.log(err)
)
},[])
const nav = (recipe) => {
  navigate(`/RecipyDetails`, { state: recipe });
};

console.log(selectedCategory)
return(
    <>
    
      <div className="all_recipes">
        <div>
     <Header/> <Category/>
     </div>
      <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
      {  
    
        // !recipes?<h1>loading...</h1>:
        
      
        !selectedCategory&&
      recipes.map((recipe) => (
        
        <Card style={{ width: '18rem',height:'20rem', backgroundColor: "rgb(49, 45, 45)", margin:"2vw"}}>
        <Card.Img variant="top" src={recipe.Img}style={{width:'15rem', height:'12rem'}} />
        <Card.Body>
          <Card.Title style={{color: "white"}}>{recipe.Name}</Card.Title>
          <Button variant="outline-warning" onClick={() =>nav(recipe)}>פרטי המתכון</Button>
        </Card.Body>
      </Card>
      ))}
      {
      selectedCategory&&
      recipes.map((recipe) => (
        selectedCategory.Id===recipe.CategoryId&&
        <Card style={{ width: '18rem',height:'20rem', backgroundColor: "rgb(49, 45, 45)", margin:"2vw"}}>
        <Card.Img variant="top" src={recipe.Img}style={{width:'15rem', height:'12rem'}} />
        <Card.Body>
          <Card.Title style={{color: "white"}}>{recipe.Name}</Card.Title>
          <Button variant="outline-warning" onClick={() =>nav(recipe)}>פרטי המתכון</Button>
        </Card.Body>
      </Card>
      ))
      }

      
    </div>

   
    </>
)

}
export default Recipies