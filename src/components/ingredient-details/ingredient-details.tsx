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
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { ingredients } = useSelector(getIngredientsSelector);
  // const location = useLocation();
  const { id } = useParams<'id'>();
  // const ingridientId = location.pathname.split('/')[2];
  const ingredientData = ingredients.find((i) => i._id == id);

  if (!ingredientData) {
    return <Preloader />;
  }
  return (
    <>
      {/* {ingredients.map((ingredientData: TIngredient) => (
        <Link
          key={ingredientData._id}
          to={`/ingredients/${ingredientData._id}`}
          state={{ backgroundLocation: location }}
        > */}
      {/* <p>{'Hello, ingredient ' + ingridientId}</p> */}
      <IngredientDetailsUI ingredientData={ingredientData} />
      {/* </Link>
      ))} */}
    </>
  );
};
