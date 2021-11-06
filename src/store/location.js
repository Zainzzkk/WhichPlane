import {createSlice} from '@reduxjs/toolkit';

export const location = createSlice({
  name: 'findLocations',
  initialState: {
    coordinates: {},
  },
  reducers: {
    setLocation: (state, action) => {
      console.log('finding location');
      state.term = action.payload;
    },
  },
});

export const {setLocation} = location.actions;
export default location.reducer;
