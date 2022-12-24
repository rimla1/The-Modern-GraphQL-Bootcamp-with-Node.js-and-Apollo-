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
};

export { Subscription as default };
