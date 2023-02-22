import request from "superagent";

const url = "api/v1/chats";

export const fetchQAChatApi = async (requestInfo: Object) => {
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
