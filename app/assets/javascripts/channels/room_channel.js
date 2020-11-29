consumer.subscriptions.create("RoomChannel", {
  speak: function(message) {
    return this.perform('speak', {
      message: message
    });
  },

  received: function(data) {
    return alert(data['message']);
  }
});

$(document).on('keypress', '[data-behavior~=room_speaker]', function(event) {
  if (event.keyCode == 13) {
    chatChannel.speak(event.target.value);
    event.target.value = '';
    return event.preventDefault();
  }
});