import request from "superagent";

const url = "api/v1/chats";

export const fetchQAChatApi = (requestInfo: JSON) => {
  request
    .post(`${url}/qa`)
    .send(requestInfo)
    .then((response) => response.body);
};
