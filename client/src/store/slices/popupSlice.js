import { createSlice } from "@reduxjs/toolkit";

const popUpSlice = createSlice({
    name: "popup",
    initialState:{
        settingPopup: false,
        
    },
    reducers: {
        toggleSettingPopup: (state) => {
            state.settingPopup = !state.settingPopup;
        },
        closeSettingPopup: (state) => {
            state.settingPopup = false;
        },
    },
})