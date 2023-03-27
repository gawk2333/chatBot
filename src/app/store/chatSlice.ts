import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { updateSettingContent } from "./pageSlice";
import { fetchQAChatApi } from "../api/chatApi";
import { ChildSettingInfo } from "./pageSlice";
import { v4 } from "uuid";

export const getChatResponse = createAsyncThunk(
  "chat/updateChatContent",
  async (requestInfo: chatItem, thunkAPI) => {
    const response = await fetchQAChatApi(requestInfo);
    return response.result;
  }
);

export interface ChatState {
  id: null | string;
  chatInfo: chatItem[];
  isLoading: boolean;
  updatedAt: number;
}

export interface chatItem {
  id: string;
  sentBy: string;
  question?: string;
  created?: number;
  choices: Array<eachChoice>;
  model?: string;
  object?: string;
  usage?: Record<string, number>;
  completionSetting?: ChildSettingInfo;
}

export interface eachChoice {
  text: string | undefined;
}

const initialState: ChatState = {
  id: null,
  chatInfo: [],
  isLoading: false,
  updatedAt: Date.now(),
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    saveQuestion: (state, action: PayloadAction<chatItem>) => {
      const choice = { text: action.payload.question };
      action.payload.choices?.push(choice);
      state.chatInfo.push(action.payload);
      state.updatedAt = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getChatResponse.fulfilled,
      (state, action: PayloadAction<chatItem>) => {
        if (!state.id) {
          state.id = v4();
        }
        action.payload.sentBy = "AI";
        state.chatInfo.push(action.payload);
        state.isLoading = false;
        state.updatedAt = Date.now();
      }
    );
    builder.addCase(getChatResponse.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { saveQuestion } = chatSlice.actions;

export default chatSlice.reducer;
