import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import '../index.css';
import '../style/bootstrap.min.css';
import Menu from "../style/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import MyCard from '../style/card';
import { SET_RECIPE, SET_CAT } from "../store/action";

const AddCategory = () => {
  const dispatch = useDispatch();
  const isCategory = useSelector(state => state.Cat);
  const recipes = useSelector(state => state.recipes);
  const durations = Array.from(new Set(recipes.map(recipe => recipe.Duration)));
  const difficulties = Array.from(new Set(recipes.map(recipe => recipe.Difficulty)));

  const [selectedDuration, setSelectedDuration] = useState('');

  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);

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

const handleFilterDuration = (duration) => {
  setSelectedDuration(duration);
};
const handleFilterDifficulty = (difficulty) => {
  setSelectedDifficulty(difficulty);
};
function OnClickCat(cat) {
  if (cat === "allRecipes") {
    // console.log("Filtering by category: All Recipes");
    dispatch({ type: SET_CAT, Cat: null });
  } else {
    // console.log("Filtering by category:", cat);
    const categoryChoose = categories.find((item) => item.Id == cat);
    dispatch({ type: SET_CAT, Cat: categoryChoose });
  }
}


const navigate = useNavigate();

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
    showAlert("Error occurred! Try again");
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
      dispatch({ type: SET_RECIPE, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

return (
  <>
    <Menu />
    <br></br>

    <div className="filters">

      <label className="category-header">My Categories</label>
      <select
        onChange={(e) => { OnClickCat(e.target.value) }}
      >
        <option value="allRecipes">My Categories</option>
        {categories.map((cat) => (
          <option key={cat.Id} value={cat.Id} >
            {cat.Name}
          </option>
        ))}
      </select>
      <label className="category-header">Durations</label>
      <select value={selectedDuration} onChange={(e) => handleFilterDuration(e.target.value)}>
        <option value="">All Durations</option>
        {durations.map((duration, index) => (
          <option key={index} value={duration}>
            {duration} minutes
          </option>
        ))}
      </select>
      <label className="category-header">Difficulties</label>
      <select value={selectedDifficulty} onChange={(e) => handleFilterDifficulty(e.target.value)}>
        <option value="">All Difficulties</option>
        {difficulties.map((difficulty, index) => (
          <option key={index} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>
    </div>
    <br></br>
    <br></br>
    <h2 className="add-category-header"> Add Category</h2>
    <form className="add-category-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="categoryName"
        className="category-input"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button className="category-submit" type="submit">Add</button>
    </form>
    <br></br>
    <br></br>
    <div className="card-container">
      {recipes &&
        recipes
          .filter((recipe) =>
            (!selectedDuration || String(selectedDuration) === String(recipe.Duration)) &&

            (!selectedDifficulty || String(selectedDifficulty) === String(recipe.Difficulty)) &&
            (!isCategory || isCategory.Id === recipe.CategoryId)
          )
          .map((recipe) => (
            <MyCard recipe={recipe} />
          ))}
    </div>
  </>
);
};

export default AddCategory;