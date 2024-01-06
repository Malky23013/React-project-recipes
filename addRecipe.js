import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './bootstrap.min.css';

const schema = yup.object().shape({
  Name: yup.string().required("שדה זה הינו חובה").min(3, "שם משתמש צריך להכיל לפחות 3 תווים"),
  CategoryId:yup.number().required("שדה זה הוא חובה "),
  Img:yup.string().required("שדה זה הינו חובה"),
  // Img-צריך לשנות ולידציה לתקינות
  Duration:yup.number().min(1),
  Description:yup.string().required("must fill it").min(3,"must contain at least 3 letters"),
  Difficulty:yup.number().min(1),
  Instructions: yup.array().of(yup.string().required("הוראה היא שדה חובה")).min(1, "חייב לציין לפחות הוראה אחת"),
});

function AddRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    // Fetch existing posts on component mount
    axios.get("http://localhost:8080/api/recipe")
      .then((response) => setRecipes(response.data));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Instructions",
  });

  const onSubmit = async (data) => {
    console.log(data);
    const postData = {
      Name: data.Name,
      Instructions: data.Instructions,
      UserId: 1,
      CategoryId: 1,
      Img: "https://www.misspetel.com/wp-content/uploads/2018/02/DSC_3995c-819x1024.jpg",
      Duration: 52,
      Difficulty: 3,
      Description: "עוגת מספרים -מצרכים לספרה אחת",
      Ingrident: [
        { "Name": "לבצק: קמח ואבקת שקדים", "Count": "90", "Type": "גרם" }
      ]
    };

    try {
      const response = await axios.post("http://localhost:8080/api/recipe", postData);
      console.log(response);
      setRecipes([...recipes, response.data]);
      setShowAddCard(false);
      reset(); // איפוס הטופס על ידי reset שמגיע מ־useForm
    } catch (error) {
      console.error(error);
      setError("Failed to create recipe");
    }
  };

  const resetForm = () => {
    setShowAddCard(true);
  };

  const toggleAddCard = () => {
    setShowAddCard(!showAddCard);
  };

  const AddCard = () => {
    return (
      <div className="AddCard">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name: </label>
          <input
            type="text"
            name="Name"
            {...register("Name")}
          />
          {errors.Name && <p>{errors.Name.message}</p>}
          <label>CategoryId: </label>
          <input
            type="number"
            name="CategoryId"
            {...register("CategoryId")}
          />
          {errors.CategoryId && <p>{errors.CategoryId.message}</p>}
          <label>Duration: </label>
          <input
            type="number"
            name="Duration"
            {...register("Duration")}
          />
          {errors.Duration && <p>{errors.Duration.message}</p>}
          <label>Difficulty: </label>
          <input
            type="number"
            name="Difficulty"
            {...register("Difficulty")}
          />
          {errors.Difficulty && <p>{errors.Difficulty.message}</p>}
          <label>Img: </label>
          <input
            type="text"
            name="Img"
            {...register("Img")}
          />
          {errors.Img && <p>{errors.Img.message}</p>}
          <label>Description: </label>
          <input
            type="text"
            name="Description"
            {...register("Description")}
          />
          {errors.Description && <p>{errors.Description.message}</p>}
          <label>Instructions: </label>
          <div className="instructions-container">
            {fields.map((field, index) => (
              <div key={field.id}>
                <input
                  type="text"
                  {...register(`Instructions.${index}`)}
                  defaultValue={field.value}
                />
                <br></br>
                <br></br>
                <button type="button" onClick={() => remove(index)}>
                  Remove Instruction
                </button>
                <br></br>
                <br></br>
              </div>
            ))}
            <br></br>
                <br></br>
            <button type="button" onClick={() => append("")}>
              Add Instruction
            </button>
          </div>
          {errors.Instructions && <p>{errors.Instructions.message}</p>}
          <input type="submit" value="Create Post" />
          {/* <button type="button" onClick={() => removebb(index)}>מחיקת משתמש</button> */}
        </form>
      </div>
    );
  };

  return (
    <div>
      <Menu />
      <br />
      <br />
      <br />
      <h2>Recipes</h2>
      <ul>
        {recipes.map((post) => (
          <li key={post.Id}>
            <h3>{post.Name}</h3>
            <p>Instructions:</p>
            <ul>
              {post.Instructions?.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
            <p>Ingredients:</p>
            <ul>
              {post.Ingrident?.map((ingredient, index) => (
                <li key={index}>{ingredient.Name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <button onClick={toggleAddCard}>
        {showAddCard ? "הצג מתכונים" : "הוסף מתכון"}
      </button>

      {showAddCard && <AddCard />}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default AddRecipe;


