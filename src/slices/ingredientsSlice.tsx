import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';

export const getIngredients = createAsyncThunk(
  'ingridients/getAll',
  async () => await getIngredientsApi()
);

type TIngridientsState = {
  ingredients: Array<TIngredient>;
  error: string | undefined;
};

const initialState: TIngridientsState = {
  ingredients: [],
  error: undefined
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state
  },

  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.error = undefined;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;

export const { getIngredientsSelector } = ingredientsSlice.selectors;
