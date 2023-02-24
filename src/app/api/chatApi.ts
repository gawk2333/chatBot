import request from "superagent";
import { chatItem } from "../store/chatSlice";

const url = "api/v1/chats";

export const fetchQAChatApi = async (requestInfo: chatItem) => {
  return await request
    .post(`${url}/qa`)
    .send(requestInfo)
    .then((response) => {
      if (response.status !== 200) {
        throw (
          response.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      return response.body;
    });
};
