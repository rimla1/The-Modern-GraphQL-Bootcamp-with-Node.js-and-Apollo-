const users = [
  {
    id: "1",
    name: "Almir",
    email: "test@gmail.com",
    age: 20,
  },
  {
    id: "2",
    name: "John",
    email: "test2@gmail.com",
    age: 22,
  },
  {
    id: "3",
    name: "Rimla",
    email: "test3@gmail.com",
    age: 22,
  },
];

const getUserById = (userID) => users.find((user) => userID === user.id);

export class UserService {
  getUserById(userId) {
    // TODO - simuliramo repo poziv
    const user = getUserById(userId);
    return user;
  }
}
