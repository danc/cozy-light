/*
 *  Helpers related to node standard library.
 */

module.exports = {

  /**
   * Clear from the require cache, the given app path.
   *
   * @param {String} modulePath App path to clear from require cache.
   */
  clearRequireCache: function (modulePath) {
    for (var name in require.cache) {
      if (name.match(new RegExp('^' + modulePath))) {
        delete require.cache[name];
      }
    }
  },

  /**
   * Close a node server by calling each socket.destroy on close event
   *
   * @param {Object} server Server to clean.
   */
  clearCloseServer: function (server) {
    var sockets = [];
    server.on('connection', function removeSockets (socket) {
      sockets.push(socket);
      socket.on('close', function () {
        sockets.splice(sockets.indexOf(socket), 1);
      });
    });
    server.on('close', function() {
      sockets.forEach(function destroySocket (socket){
        socket.destroy();
      });
    });
  }
};
