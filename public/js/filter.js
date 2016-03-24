$(function() {
  var items = [
    ['extracurricular reading', 'classroom content support', 'classroom experience'],
    ['primary school', 'middle school', 'high school', 'university', 'all grades'],
    ['computers', 'tablets', 'eReaders', 'phones', 'all devices'],
    ['no internet', 'infrequent', 'stable', 'all connection types'],
    ['free', 'paid']
    ];
  var tags = [
    'Goals', 'Grade', 'Device', 'Internet', 'Cost'
  ];
  for (var i = 0; i < tags.length; i++) {
    $('.' + tags[i].toLowerCase().replace(/ /g, "_")).append('<h4>' + tags[i] + '</h4>');
    for (var j = 0; j < items[i].length; j++) {
      var label = $('<label class="active">');
      label.append($('<input type="checkbox" checked/>').attr('id', items[i][j].toLowerCase().replace(/ /g, '_')));
      label.append(items[i][j]);
      $('.' + tags[i].toLowerCase().replace(/ /g, "_")).append(label);
    }
  }

  $('.filters input').click(function() {
    $(this).parent().toggleClass('active');
    var count = 0;
    for (var i = 0; i < items.length; i++) {
      items[i] = items[i].toLowerCase().replace(/ /g, '_');
      if ($('#' + items[i]).prop('checked')) {
        count++;
      }
    }

    if (count === items.length) {
      // all selected
      $('.resource').show();
      return;
    }
    $('.resource').hide();
    $('.resource').each(function(p, item) {
      var place = $(item);
      var txt = place.text().toLowerCase();
      for (var i = 0; i < items.length; i++) {
        if ($('#' + items[i]).prop('checked') && txt.indexOf(items[i].replace(/_/g, ' ')) > -1) {
          place.show();
          break;
        }
      }
    });
  });
});
