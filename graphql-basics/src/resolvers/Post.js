const Post = {
  author(parent, args, { db }, info) {
    // data loaderi
    console.log("post resolver for author?");
    return db.users.find((user) => {
      return user.id === parent.author;
    });
  },
  comments(parent, args, { db }, info) {
    // data loaderi
    console.log("post resolver for comments?");
    return db.comments.filter((comment) => {
      return comment.post === parent.id;
    });
  },
};

export { Post as default };
