import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';

export const getIngridients = createAsyncThunk(
  'ingridients/getAll',
  async () => await getIngredientsApi()
);

type TIngridientsState = {
  ingridients: Array<TIngredient>;
  error: string | undefined;
};

const initialState: TIngridientsState = {
  ingridients: [],
  error: undefined
};

const ingredientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  selectors: {
    getIngridientsSelector: (state) => state
  },

  extraReducers: (builder) => {
    builder
      .addCase(getIngridients.pending, (state) => {
        state.error = undefined;
      })
      .addCase(getIngridients.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getIngridients.fulfilled, (state, action) => {
        state.ingridients = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;

export const { getIngridientsSelector } = ingredientsSlice.selectors;
