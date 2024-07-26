import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    theme:'dark'
}


export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers:{
        toggletheme: (state)=>{
            state.theme = state.theme === 'dark' ? 'light' : 'dark';  
        }
    }
});

export const {toggletheme} = themeSlice.actions;
export default themeSlice.reducer;