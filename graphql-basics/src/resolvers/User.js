import { UserService } from "./userService";
const userService = new UserService();

const User = {
  posts(parent, args, { db }, info) {
    return db.posts.filter((post) => {
      return post.author === parent.id;
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter((comment) => {
      return comment.author === parent.id;
    });
  },
  premium(parent, args, { db }, info) {
    return { id: "1", isPremium: true };
  },
};

export { User as default };
