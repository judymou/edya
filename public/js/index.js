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
}
$(function() {
  window.app = new App();
  window.app.init();
});
