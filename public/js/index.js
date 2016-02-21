function App() {
  var me = this;

  App.prototype.init = function() { 
    window.randomize = function() {
      var amountRaised = parseInt($('#amountRaised').text());
      var amountLeft = parseInt($('#amountLeft').text());
      $('.radial-progress').attr('data-progress',
          Math.floor(amountRaised / (amountRaised + amountLeft) * 100));
    }
    setTimeout(window.randomize, 200);
    $('.radial-progress').click(window.randomize);
  };

  var handler = StripeCheckout.configure({
    key: 'pk_test_TFHGrWKWYdgVzsv5eLm3PW9C',
    token: function(token) {
      document.body.style.cursor = 'wait';
      $.get('/pay?email=' + token.email + '&tok=' + token.id + '&amount=' +
        $('#amount').val() * 100, function(resp) {
          document.body.style.cursor='default';
          if (resp === 'ok') {
            window.alert("Thanks! We'll follow up with confirmation and updates of your donation.");
          } else {
            window.alert('Uh oh, something went wrong. Your card was not charged.');
          }
        });
    },
  });

  $('#give-button').on('click', function() {
    handler.open({
      name:'Edya',
      amount: $('#amount').val() * 100,
    });
  });
}
$(function() {
  window.app = new App();
  window.app.init();
});
