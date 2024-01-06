
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../style/Menu";
const AddRecipe = () => {
  const schema = yup.object().shape({
    Name: yup.string().required("שדה זה הינו חובה").min(3, "שם משתמש צריך להכיל לפחות 3 תווים"),
    CategoryId: yup.number().required("שדה זה הוא חובה "),
    Img: yup.string().required("שדה זה הינו חובה"),
    Duration: yup.number().min(1),
    Description: yup.string().required("must fill it").min(3, "must contain at least 3 letters"),
    Difficulty: yup.number().min(1),
    Ingrident: yup.array().of(
      yup.object().shape({
        Name: yup.string().required("שדה זה הינו חובה"),
        Count: yup.string().required("שדה זה הינו חובה"),
        Type: yup.string().required("שדה זה הינו חובה"),
      })
    ),
    Instructions: yup.array().of(yup.string().required("הוראה היא שדה חובה")).min(1, "חייב לציין לפחות הוראה אחת"),
  });

  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const UserId = useSelector(state => state?.user?.Id);

  const user1 = useSelector(state => state.user);
  const userId1 = user1.Id;
  const selectRecipe = state?state.recipes:null;
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/category")
      .then((response) => {
        setCategories(response.data);
      })
  
  }, []);
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      UserId: selectRecipe?.UserId || "",
      Name: selectRecipe?.Name || "",
      CategoryId: selectRecipe?.CategoryId || "",
      Img: selectRecipe?.Img || "",
      Duration: selectRecipe?.Duration || "",
      Difficulty: selectRecipe?.Difficulty || "",
      Description: selectRecipe?.Description || "",
      Ingrident: selectRecipe?.Ingrident || [],
      Instructions: selectRecipe?.Instructions || [],
    },
  });

  const { fields: ingridentFields, append: appendIngrident, remove: removeIngrident } = useFieldArray({
    control,
    name: "Ingrident",
  });

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control,
    name: "Instructions",
  });

  const addIngredientField = () => {
    appendIngrident({ Name: "", Count: "", Type: "" });
  };

  const handleIngredientChange = (index, key, value) => {
    setValue(`Ingrident[${index}].${key}`, value);
  };

  const handleInstructionChange = (index, value) => {
    setValue(`Instructions[${index}]`, value || "");
  };

  const onSubmit = (data) => {
    const postData = {
      Name: data.Name,
      Instructions: data.Instructions,
      UserId: userId1,
      CategoryId: data.CategoryId,
      Img: data.Img,
      Duration: data.Duration,
      Difficulty: data.Difficulty,
      Description:data.Description,
      Ingrident: data.Ingrident
    };
    console.log("Form Data:", data);
    
    console.log("post data:", postData);
    console.log(userId1);
    if (selectRecipe) {
      axios.post("http://localhost:8080/api/recipe/edit", {
        Id: selectRecipe?.Id,
        UserId: UserId?.Id,
        ...data,
      }).then(response => {
        navigate('/myRecipes');
      }).catch(error => {
        console.error(error);
      });
    } else {
      console.log("Form Data:", data);
      axios.post("http://localhost:8080/api/recipe", postData).then(response => {
        navigate(`/myRecipes`);
      }).catch(error => {
        console.error(error);
      });
    }
  };
  
  return (
    <>
      <Menu />
      <br />
      <div className="AddCard">
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          {Object.entries(errors).map(([fieldName, error]) => (
            <p key={fieldName}>{error.message}</p>
          ))}

          <input {...register("Name")} placeholder="name" />
          <select {...register("CategoryId")} placeholder="category">
            <option value="" disabled>Select a category</option>
            {categories.map(category => (
              <option key={category.Id} value={category.Id}>{category.Name}</option>
            ))}
          </select>
          <input {...register("Img")} placeholder="img" />
          <input {...register("Duration")} placeholder="duration" />
          <input {...register("Difficulty")} placeholder="difficulty" />
          <input {...register("Description")} placeholder="description" />
          <p>{errors.body?.message}</p>

          <div>
            <label>Ingredients</label>
            {ingridentFields.map((field, index) => (
              <div key={index}>
                <input
                  onChange={(e) => handleIngredientChange(index, "Name", e.target.value)}
                  {...register(`Ingrident[${index}].Name`)}
                  placeholder="ingredient"
                />
                <input
                  placeholder="count"
                  onChange={(e) => handleIngredientChange(index, "Count", e.target.value)}
                  {...register(`Ingrident[${index}].Count`)}
                />
                <input
                  onChange={(e) => handleIngredientChange(index, "Type", e.target.value)}
                  {...register(`Ingrident[${index}].Type`)}
                  placeholder="Type"
                />
                <button type="button" onClick={() => removeIngrident(index)}>
                  Remove Ingredient
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addIngredientField}>
            add ingredient
          </button>

          <div>
            <label>Instructions</label>
            {instructionFields.map((field, index) => (
              <div key={index}>
                <input
                  type="text"
                  {...register(`Instructions[${index}]`)}
                  defaultValue={field.Instructions || ""}
                />
                <button type="button" onClick={() => removeInstruction(index)}>
                  Remove Instruction
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => appendInstruction({ Instructions: "" })}
          >
            Add Instruction
          </button>

          <input type="submit" value={"send"} />
        </form>
      </div>
    </>
  );
};

export default AddRecipe;


