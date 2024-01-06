import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const MyCard=({ recipe }) =>{
  const navigate = useNavigate();
  return (
    <div>
     <Card className="itemCard" sx={{ maxWidth: 345 }}
         onClick={() => navigate(`/detailsRecipe`, { state: { recipe } })}>
          {/* onclick={()=>{details(recipe)}} */}

        <div key={recipe.Id}>

          <CardMedia
            sx={{ height: 140 }}
            image={recipe.Img}
            
          />
          <CardContent>
            {recipe.Name}
          
          </CardContent>
          {/* <>
      
            <CardActions>
              <button onClick={() => { }}>
                Edit
              </button>
              <button onClick={() => { }}>
                Delete
              </button>
            </CardActions>  
          </> */}
        

          {/* ... other recipe sections */}
        </div>
              </Card>  
   </div>
   

  );
}
export default MyCard;