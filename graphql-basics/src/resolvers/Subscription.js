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
      console.log("Ovde ulazi");
      const postExist = db.posts.find(
        (post) => postId === post.id && post.published
      );
      console.log(postExist);
      if (!postExist) {
        throw new Error("Post not found!");
      }
      console.log(`Comment ${postId}`);
      return pubsub.asyncIterator(`Comment ${postId}`);
    },
  },
};

export { Subscription as default };
