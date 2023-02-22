import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  pages: PageInfo;
  currentPage: pageTypes[];
}

export interface PageInfo {
  settingPage: SettingPageInfo;
  chatWindowPage: ChatPageInfo;
}

export interface SettingPageInfo {}

export interface ChatPageInfo {
  chatInput: string;
}

export enum pageTypes {
  settingPage = "settingPage",
  chatPage = "chatPage",
}

const initialState: PageState = {
  currentPage: [pageTypes.chatPage],
  pages: { settingPage: {}, chatWindowPage: { chatInput: "" } },
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    updateInput: (state, action: PayloadAction<string>) => {
      state.pages.chatWindowPage.chatInput = action.payload;
    },
    addPage: (state, action: PayloadAction<pageTypes>) => {
      state.currentPage.push(action.payload);
    },
    removePage: (state, action: PayloadAction<pageTypes>) => {
      state.currentPage = state.currentPage.filter(
        (page: pageTypes) => page !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPage, removePage, updateInput } = pageSlice.actions;

export default pageSlice.reducer;
