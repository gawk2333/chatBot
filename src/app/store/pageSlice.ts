import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  pages: Array<PageInfo>;
  currentPage: Array<string>;
}

export interface PageInfo {
  settingPage: SettingPageInfo;
  chatWindowPage: ChatPageInfo;
}

export interface SettingPageInfo {}

export interface ChatPageInfo {
  chatInput: string;
}

const initialState: PageState = {
  currentPage: ["chatPage"],
  pages: [{ settingPage: {}, chatWindowPage: { chatInput: "" } }],
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    addPage: (state, action: PayloadAction<string>) => {
      state.currentPage.push(action.payload);
    },
    removePage: (state, action: PayloadAction<string>) => {
      state.currentPage.filter((page: string) => page !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPage, removePage } = pageSlice.actions;

export default pageSlice.reducer;
