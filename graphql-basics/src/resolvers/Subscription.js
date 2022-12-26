const Subscription = {
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
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator(`Post`);
    },
  },
};

export { Subscription as default };
