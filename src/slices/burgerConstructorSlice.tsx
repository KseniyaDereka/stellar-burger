import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk
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
  };
};

const initialState: ConstructorSliceState = {
  constructorItems: {
    bun: null,
    ingredients: []
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
    }
  },
  selectors: {
    getConstructorSelector: (state) => state.constructorItems,
    getIngridientId: ({ constructorItems: { bun, ingredients } }) =>
      [bun, ...ingredients].map((i) => i?._id)
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(makeOrder.pending, (state) => {
  //       state.error = undefined;
  //     })
  //     .addCase(makeOrder.rejected, (state, action) => {
  //       state.error = action.error.message;
  //     })
  //     .addCase(makeOrder.fulfilled, (state, action) => {
  //       state. = action.payload;
  //     });
  // }
});

export default constructorSlice.reducer;
export const { getConstructorSelector } = constructorSlice.selectors;
export const { addIngredient, removeIngredient } = constructorSlice.actions;
