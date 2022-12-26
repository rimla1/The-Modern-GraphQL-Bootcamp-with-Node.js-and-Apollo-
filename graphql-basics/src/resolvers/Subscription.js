const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish("counter", {
          count: count,
        });
      }, 1000);

      return pubsub.asyncIterator("counter"); // like a chatroom name
    },
  },
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const postExist = db.posts.find(
        (post) => postId === post.id && post.published
      );
      if (!postExist) {
        throw new Error("Post not found!");
      }
      return pubsub.asyncIterator(`Comment ${postId}`);
    },
  },
  post: {
    subscribe(parent, { userId }, { db, pubsub }, info) {
      const userExist = db.users.find((user) => user.id === userId);
      if (!userExist) {
        throw new Error("User to subscribe is not found!");
      }
      return pubsub.asyncIterator(`Post ${userId}`);
    },
  },
};

export { Subscription as default };
