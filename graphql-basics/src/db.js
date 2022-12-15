let users = [
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

let posts = [
  {
    id: "1",
    title: "Winter",
    body: "Nice mountains with a lot of snow",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "Spring",
    body: "Nice flavour of flowers",
    published: false,
    author: "1",
  },
  {
    id: "3",
    title: "Summer",
    body: "Swim at the pool",
    published: false,
    author: "3",
  },
];

let comments = [
  {
    id: "1",
    text: "That's awesome mountains over there",
    author: "2",
    post: "1",
  },
  {
    id: "2",
    text: "Kopaonik is better than that mountain. LOL!",
    author: "2",
    post: "1",
  },
  {
    id: "3",
    text: "Is is cool there?",
    author: "3",
    post: "1",
  },
  {
    id: "4",
    text: "Nice swimming pool",
    author: "1",
    post: "3",
  },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };
