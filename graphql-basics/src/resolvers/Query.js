const Query = {
  users(parent, args, { db }, info) {
    if (!args.letter) {
      return db.users;
    }
    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.letter.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.letter) {
      return db.posts;
    }
    return db.posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(args.letter.toLowerCase()) ||
        post.body.toLowerCase().includes(args.letter.toLowerCase())
      );
    });
  },
  user(parent, args, ctx, info) {
    const user = userService.getUserById(args.userId);
    return user;
  },
  me() {
    return {
      id: "2555",
      name: "Almir",
      email: "test@gmail.com",
      age: 20,
    };
  },
  post() {
    return {
      id: "4333",
      title: "Winter",
      body: "Nice mountains with a lot of snow",
      published: true,
      author: "1",
    };
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export { Query as default };
