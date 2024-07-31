let broadcast = () => {};

const notifyClients = (data) => {
  broadcast(JSON.stringify(data));
};

module.exports = notifyClients;
