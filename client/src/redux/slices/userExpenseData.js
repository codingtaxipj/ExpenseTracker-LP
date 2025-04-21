import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data : "data incoming"
}

const userExpenseData = createSlice({
    name:'expense',
    initialState,
});

export default userExpenseData.reducer;
