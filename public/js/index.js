function App() {
  var me = this;

  App.prototype.init = function() {
    $('[data-toggle="tooltip"]').tooltip();

    setTimeout(me._loadProgress, 200);
    $('.radial-progress').click(me._loadProgress);

    var handler = StripeCheckout.configure({
      //key: 'pk_test_TFHGrWKWYdgVzsv5eLm3PW9C',
      key: 'pk_live_P6ceN46QXkER4okBzAREqSeV',
      token: function(token) {
        document.body.style.cursor = 'wait';
        $.get('/pay?email=' + token.email + '&tok=' + token.id + '&amount=' +
          $('#amount').val() * 100 + '&project=' + window.location.pathname, function(resp) {
            document.body.style.cursor='default';
            if (resp === 'ok') {
              setTimeout(me._updateProgress, 200);
              $('.radial-progress').click(me._updateProgress);
            } else {
              window.alert('Uh oh, something went wrong. Your card was not charged.');
            }
          });
      },
    });

    $('#give-button').on('click', function() {
      //handler.open({
      //  name:'Edya',
      //  amount: $('#amount').val() * 100,
      //});
      window.alert('Current campaign cycle closed and we no longer take more donations. Please come back later for more projects! Thanks :)');
    });
  };

  App.prototype._loadProgress = function() {
    var amountRaised = parseInt($('#amountRaised').text());
    var amountLeft = parseInt($('#amountLeft').text());
    me._loadProgressBar(amountRaised, amountLeft);
  }

  App.prototype._updateProgress = function() {
    var amountRaised = parseInt($('#amountRaised').text()) + parseInt($('#amount').val());
    var amountLeft = parseInt($('#amountLeft').text()) - parseInt($('#amount').val());
    $('#amountRaised').text(amountRaised);
    $('#amountLeft').text(amountLeft);
    $('#numDonor').text(parseInt($('#numDonor').text()) + 1);
    $('#amount').val("");
    me._loadProgressBar(amountRaised, amountLeft);
    $('.thankyou').css('opacity', '100');
    $('.thankyou').css('height', 'auto');
  }

  App.prototype._loadProgressBar = function(amountRaised, amountLeft) {
    $('.radial-progress').attr('data-progress',
        Math.floor(amountRaised / (amountRaised + amountLeft) * 100));
  }
}
$(function() {
  window.app = new App();
  window.app.init();
});
