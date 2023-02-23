import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  pages: PageInfo;
  currentPage: pageTypes[];
}

export interface PageInfo {
  settingPage: SettingPageInfo;
  chatWindowPage: ChatPageInfo;
}

export interface SettingPageInfo {
  chat: ChildSettingInfo;
  image: ChildSettingInfo;
}

export interface ChildSettingInfo {
  model: string;
  prompt: string;
  temperature: number;
  max_tokens: number;
  frequency_penalty: number;
  presence_penalty: number;
  stop: Array<string>;
}

export interface ChatPageInfo {
  chatInput: string;
}

export enum pageTypes {
  settingPage = "settingPage",
  chatPage = "chatPage",
}

const initialState: PageState = {
  currentPage: [pageTypes.chatPage],
  pages: {
    settingPage: {
      chat: {
        model: "text-davinci-003",
        prompt: generatePrompt("Hello"),
        temperature: 0,
        max_tokens: 2048,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["Human:", "AI:"],
      },
      image: {
        model: "text-davinci-003",
        prompt: generatePrompt("Hello"),
        temperature: 0,
        max_tokens: 2048,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["Human:", "AI:"],
      },
    },
    chatWindowPage: { chatInput: "" },
  },
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
    updateSettingContent: (state, action: PayloadAction<SettingPageInfo>) => {
      state.pages.settingPage = action.payload;
    },
  },
});

function generatePrompt(question: string) {
  return `The following is a conversation with an AI assistant. The assistant is helpful,creative,
    clever, and very friendly.
    Human: Hello, who are you?
    AI: I am an AI created by open AI. How can I help today?
    Human:${question}.
    AI:`;
}
// Action creators are generated for each case reducer function
export const { addPage, removePage, updateInput, updateSettingContent } =
  pageSlice.actions;

export default pageSlice.reducer;
