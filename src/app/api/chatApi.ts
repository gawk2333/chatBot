import request from "superagent";

const url = "api/v1/chats";

export const fetchQAChatApi = async (requestInfo: Object) => {
  return await request
    .post(`${url}/qa`)
    .send(requestInfo)
    .then((response) => {
      return response.body;
    });
};
