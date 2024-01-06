import React from "react";

function MyRecipe({ recipe }) {
  return (
    <div>
      <h2>{recipe.Name}</h2>
      <p>{recipe.Description}</p>
      <ul>
        {recipe.Instruction?.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ul>
      <img src={recipe.Img} alt={recipe.Name} />
    </div>
  );
}

export default MyRecipe;
