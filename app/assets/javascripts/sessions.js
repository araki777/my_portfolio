$(function() {
  $(".sessions-container").bgSwitcher({
    images: [
      '/images/sessions/fukei1.jpg',
      '/images/sessions/fukei2.jpg',
      '/images/sessions/fukei3.jpg',
      '/images/sessions/fukei4.jpg',
      '/images/sessions/fukei5.jpg',
    ],
    interval: 7000,
    loop: true,
    shuffle: true,
    effect: "fade",
    duration: 2000,
    easing: "linear"
  });
});
