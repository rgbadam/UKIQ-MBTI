App({
  globalData: {
    requestUrl: 'http://localhost:3000/api/namzar/mini',
    // requestUrl: 'https://popout.tech/api/namzar/mini',
    eventBus: {
      listeners: {},
      emit: function(event, data) {
        if (this.listeners[event]) {
          this.listeners[event].forEach(listener => listener(data));
        }
      },
      on: function(event, callback) {
        if (!this.listeners[event]) {
          this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
      },
      off: function(event, callback) {
        if (this.listeners[event]) {
          const index = this.listeners[event].indexOf(callback);
          if (index > -1) {
            this.listeners[event].splice(index, 1);
          }
        }
      }
    },
  }
});
