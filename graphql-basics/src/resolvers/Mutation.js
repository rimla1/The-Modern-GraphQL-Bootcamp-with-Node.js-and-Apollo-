import { v4 as uuidv4 } from "uuid";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => user.email === args.data.email);
    if (emailTaken) {
      throw new Error("User with that email already exists");
    }
    const userId = uuidv4();

    const user = {
      id: userId,
      ...args.data,
    };

    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);
    if (userIndex === -1) {
      throw new Error("User does not exist!");
    }

    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;
      if (match) {
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });

    db.comments = db.comments.filter((comment) => {
      return comment.author !== args.id;
    });

    return deletedUsers[0];
  },
  updateUser(parent, args, { db }, info) {
    const user = db.users.find((user) => user.id === args.id);

    if (!user) {
      throw new Error("User does not exists!");
    }

    if (typeof args.data.email === "string") {
      const emailTaken = db.users.some((user) => {
        return user.email === args.data.email;
      });
      if (emailTaken) {
        throw new Error("User with that email already exists, try a new one!");
      }
      user.email = args.data.email;
    }

    if (typeof args.data.name === "string") {
      user.name = args.data.name;
    }

    if (typeof args.data.age !== "undefined") {
      user.age = args.data.age;
    }

    return user;
  },
  createPost(parent, args, { db, pubsub }, info) {
    const userExist = db.users.some((user) => user.id === args.data.author);
    if (!userExist) {
      throw new Error("User not found associated with a post!");
    }

    const post = {
      id: uuidv4(),
      ...args.data,
    };
    db.posts.push(post);
    if (post.published) {
      pubsub.publish(`Post`, {
        post: {
          mutation: "CREATE",
          data: post,
        },
      });
    }

    return post;
  },
  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);
    if (postIndex === -1) {
      throw new Error("Post does not exists");
    }
    const [post] = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter((comment) => comment.post !== args.id);
    if (post.published) {
      pubsub.publish("Post", {
        post: {
          mutation: "DELETE",
          data: post,
        },
      });
    }

    return post;
  },
  updatePost(parent, args, { db, pubsub }, info) {
    const post = db.posts.find((post) => post.id === args.id);
    const originalPost = { ...post };

    if (!post) {
      throw new Error("Post is not found!");
    }
    if (typeof args.data.title === "string") {
      post.title = args.data.title;
    }

    if (typeof args.data.body === "string") {
      post.body = args.data.body;
    }

    if (typeof args.data.published === "boolean") {
      post.published = args.data.published;
      if (!originalPost.published && post.published) {
        pubsub.publish("Post", {
          post: {
            mutation: "CREATED",
            data: post,
          },
        });
      }
      if (originalPost.published && !post.published) {
        pubsub.publish("Post", {
          post: {
            mutation: "DELETED",
            data: originalPost,
          },
        });
      }
    }
    if (post.published) {
      pubsub.publish("Post", {
        post: {
          mutation: "UPDATED",
          data: post,
        },
      });
    }

    return post;
  },
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author);
    const postExists = db.posts.some((post) => {
      return post.id === args.data.post && post.published === true;
    });
    if (!userExists || !postExists) {
      throw new Error(
        "Comment does not have author or comment does not have post to be published"
      );
    }

    const comment = {
      id: uuidv4(),
      ...args.data,
    };

    db.comments.push(comment);
    pubsub.publish(`Comment ${comment.post}`, {
      comment: {
        mutation: "CREATED",
        data: comment,
      },
    });
    return comment;
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );
    if (commentIndex === -1) {
      throw new Error("Comment does not exist");
    }
    const [deletedComment] = db.comments.splice(commentIndex, 1);
    pubsub.publish(`Comment ${deletedComment.post}`, {
      comment: {
        mutation: "DELETED",
        data: deletedComment,
      },
    });
    return deletedComment;
  },
  updateComment(parent, args, { db, pubsub }, info) {
    const comment = db.comments.find((comment) => args.id === comment.id);
    if (!comment) {
      throw new Error("Comment not Found!");
    }

    if (typeof args.data.text === "string") {
      comment.text = args.data.text;
      console.log(comment.id, args.id);
      pubsub.publish(`Comment ${args.id}`, {
        comment: {
          mutation: "UPDATED",
          data: comment,
        },
      });
    }

    return comment;
  },
};

export { Mutation as default };
