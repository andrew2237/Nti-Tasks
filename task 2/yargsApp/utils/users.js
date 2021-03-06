const dealWithData = require("./dealWithData");
const userData = require("./validation");

const addUser = (args) => {
  let errors = [];
  let user = {};
  try {
    userData.forEach((d) => {
      if (d.invalid(args[d.ele])) errors.push(d.invalid(args[d.ele]));
      if (!d.default) return (user[d.ele] = args[d.ele]);
      user[d.ele] = d.default;
    });
    if (errors.length > 0) throw new Error(errors);
    const users = dealWithData.readDataFromJSON("./db/data.json");
    users.length == 0
      ? (user.id = 1)
      : (user.id = users[users.length - 1].id + 1);
    users.push(user);
    dealWithData.writeDataToFile("./db/data.json", users);
  } catch (e) {
    console.log(e.message);
  }
};
const showAll = () => {
  const users = dealWithData.readDataFromJSON("./db/data.json");
  users.forEach((user) => {
    let u = `id => ${user.id}\n`;
    userData.forEach((d) => (u += d.ele + "=>" + user[d.ele] + "\n"));
    console.log(u);
  });
};
const addtransaction = (data) => {
  try {
    const users = dealWithData.readDataFromJSON("./db/data.json");
    let userIndex = users.findIndex((u) => u.id == data.id);
    if (userIndex == -1) throw new Error("user not found");
    users[userIndex].transaction.push({
      addrId: Date.now(),
      transType: data.transType,
    });
    dealWithData.writeDataToFile("./db/data.json", users);
    console.log("data added");
  } catch (e) {
    console.log(e.message);
  }
};
const showUser = (data) => {
  const users = dealWithData.readDataFromJSON("./db/data.json");
  let user = users.find((u) => u.id == data.id);
  if (user == -1) throw new Error("user not found");
  console.log(user);
};
const delUser = (data) => {
  try {
    const users = dealWithData.readDataFromJSON("./db/data.json");
    let user = users.findIndex((u) => u.id == data.id);
    if (user == -1) throw new Error("user not found");
    users.splice(user, 1);
    dealWithData.writeDataToFile("./db/data.json", users);
    console.log("user of id " + (user + 1) + " has been deleted");
  } catch (e) {
    console.log(e.message);
  }
};
const delAllUsers = () => {
  let users = dealWithData.readDataFromJSON("./db/data.json");
  users = [];
  dealWithData.writeDataToFile("./db/data.json", users);
};
module.exports = {
  addUser,
  showAll,
  addtransaction,
  showUser,
  delUser,
  delAllUsers,
};
