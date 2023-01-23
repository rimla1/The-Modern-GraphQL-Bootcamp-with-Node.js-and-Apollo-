import DataLoader from "dataloader";

const getUserById = (author, db) => {
  console.log("Pozivam se!");
  // return db.users.find((user) => {
  //   return user.id === author;
  // });
};

const userLoader = new DataLoader((keys) => getUserById(keys));

const Comment = {
  author(parent, ags, { db }, info) {
    console.log("Pokusavam da resolvam authora");
    // data loaderi
    // console.log("comment resolver for author?");
    // const user = getUserById(parent.author, db);
    userLoader.load(parent.author, db);
    // return user;
  },
  post(parent, args, { db }, info) {
    // data loaderi
    console.log("comment resolver for post?");
    return db.posts.find((post) => {
      return post.id === parent.post;
    });
  },
};

export { Comment as default };
