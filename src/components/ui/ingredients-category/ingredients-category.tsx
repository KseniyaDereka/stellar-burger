import styles from './ingredients-category.module.css';
import { forwardRef } from 'react';
import { TIngredientsCategoryUIProps } from './type';
import { BurgerIngredient } from '@components';
import { Link, useLocation } from 'react-router-dom';

export const IngredientsCategoryUI = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryUIProps
>(({ title, titleRef, ingredients, ingredientsCounters }, ref) => (
  // const location = useLocation();
  <>
    <h3 className='text text_type_main-medium mt-10 mb-6' ref={titleRef}>
      {title}
    </h3>
    <ul className={styles.items} ref={ref}>
      {ingredients.map((ingredient) => (
        // <Link
        //   key={ingredient._id}
        //   to={`/ingredients/${ingredient._id}`}
        //   state={{ backgroundLocation: location }}
        // > */}
        <BurgerIngredient
          ingredient={ingredient}
          key={ingredient._id}
          count={ingredientsCounters[ingredient._id]}
        />
        // {</Link>}
      ))}
    </ul>
  </>
));
