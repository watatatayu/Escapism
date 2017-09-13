function formatToSlash(ctime){
  const yearHyphen = 5;
  const secondDigit = 13;

  date = ctime.slice(yearHyphen).replace("-", "/").replace("T", " ").slice(0, -secondDigit);
  return date
}

App.chatrooms = App.cable.subscriptions.create(
  {
    channel: "ChatRoomsChannel",
    room_id: $("#chatroom").data('room_id')
  },
  {
    connected: function() {
      // Called when the subscription is ready for use on the server
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
    },

    received: function(message) {
      const createdAt = formatToSlash(message['object']['created_at']);

      $("div .hogehoge").append(`
                                  <span>${message['object']['name']}<span>
                                  <span>${message['object']['role']}<span>
                                  <span>${message['object']['body']}<span>
                                  <span>${createdAt}<span>
                                  <br>
                               `);
      // Called when there's incoming data on the websocket for this channel
    },

    post: function(message) {
      return this.perform('post', {
        body: message
      });
    }
  }
);

$(document).on('keypress', `[data-behavior~=chatroom_${$("#chatroom").data('room_id')}]`, function(event) {
  if (event.keyCode === 13) {
    App.chatrooms.post(event.target.value);
    event.target.value = '';
    return event.preventDefault();
  }
});

