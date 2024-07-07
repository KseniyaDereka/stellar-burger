import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
  current
} from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient, TOrder } from '../utils/types';
import { orderBurgerApi } from '../utils/burger-api';

const makeOrder = createAsyncThunk(
  'burger/order',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

type ConstructorSliceState = {
  constructorItems: {
    bun: null | TConstructorIngredient;
    ingredients: Array<TConstructorIngredient>;
    orderRequest: boolean;
  };
};

const initialState: ConstructorSliceState = {
  constructorItems: {
    bun: null,
    ingredients: [],
    orderRequest: false
  }
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },
    ingridientDown: (state, action: PayloadAction<TConstructorIngredient>) => {
      const index = state.constructorItems.ingredients.findIndex(
        (i) => i.id == action.payload.id
      );
      const [selected, next] = [
        state.constructorItems.ingredients[index],
        state.constructorItems.ingredients[index + 1]
      ];
      state.constructorItems.ingredients.splice(index, 2, next, selected);
    },
    ingridientUp: (state, action: PayloadAction<TConstructorIngredient>) => {
      const index = state.constructorItems.ingredients.findIndex(
        (i) => i.id == action.payload.id
      );
      console.log(index);
      const [selected, previous] = [
        state.constructorItems.ingredients[index],
        state.constructorItems.ingredients[index - 1]
      ];
      state.constructorItems.ingredients.splice(
        index - 1,
        2,
        selected,
        previous
      );
    }
  },
  selectors: {
    getConstructorSelector: (state) => state.constructorItems,
    getIngredientId: ({ constructorItems: { bun, ingredients } }) =>
      [bun, ...ingredients].map((i) => i?._id)
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(makeOrder.pending, (state) => {
  //       state.constructorItems.orderRequest = false;
  //     })
  //     .addCase(makeOrder.rejected, (state, action) => {
  //       state.constructorItems.orderRequest = false;
  //     })
  //     .addCase(makeOrder.fulfilled, (state, action) => {
  //       state.constructorItems.orderRequest = true;
  //       state.constructorItems.ingredients = action.payload.order;
  //     });

  //     });
  // }
});

export default constructorSlice.reducer;
export const { getConstructorSelector, getIngredientId } =
  constructorSlice.selectors;
export const { addIngredient, removeIngredient, ingridientDown, ingridientUp } =
  constructorSlice.actions;
