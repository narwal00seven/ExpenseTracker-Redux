import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
    name: "edit",
    initialState : {
        isEditable : false,
    },
    reducers: {
        startEditing(state){
            state.isEditable = true;
        },
        stopEditing(state) {
            state.isEditable = false;
        }
    },
});

export default editSlice;