import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import {
  getIngredientsSelector,
  getIngredients
} from '../../slices/ingredientsSlice';
import { getIngredientId } from '../../slices/burgerConstructorSlice';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { ingredients } = useSelector(getIngredientsSelector);
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const { id } = useParams<'id'>();
  const ingredientData = ingredients.find((i) => i._id == id);
  console.log(id);
  if (!ingredientData?._id) {
    return (
      <>
        <p>Связываемся с поварами...</p>
        <Preloader />
      </>
    );
  }
  return (
    <>
      {/* <Link
        key={ingredientData._id}
        to={`/ingredients/${ingredientData._id}`}
        state={{ backgroundLocation: location }}
      > */}

      <IngredientDetailsUI ingredientData={ingredientData} />

      {/* </Link> */}
    </>
  );
};
