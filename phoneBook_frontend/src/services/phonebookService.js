import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = (newEntry) => {
  const req = axios.post(baseUrl, newEntry);
  return req.then((res) => res.data);
};

const update = (id, newEntry) => {
  // console.log("updated url : ",`${baseUrl}/${id}` )
  const req = axios.put(`${baseUrl}/${id}`, newEntry);
  return req.then((res) => res.data);
};

const destroyPhoneEntry = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
};

export default { getAll, create, update, destroyPhoneEntry };
