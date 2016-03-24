$(function() {
  var items = [
    ['extracurricular reading', 'classroom content support', 'classroom experience'],
    ['primary school', 'middle school', 'high school', 'university'],
    ['computers', 'tablets', 'eReaders', 'phones'],
    ['no internet', 'infrequent', 'stable'],
    ['free']
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
    for (var i = 0; i < tags.length; i++) {
      for (var j = 0; j < items[i].length; j++) {
        items[i][j] = items[i][j].toLowerCase().replace(/ /g, '_');
        if ($('#' + items[i][j]).prop('checked')) {
          count++;
        }
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
      var checkedItems = [];
      if ($('#primary_school').prop('checked')
          && $('#middle_school').prop('checked')
          && $('#high_school').prop('checked')) {
        checkedItems.push('all grades');
      } else {
        checkedItems = checkedItems.concat(items[1]);
      }
      if ($('#computers').prop('checked')
          && $('#tablet').prop('checked')
          && $('#eReaders').prop('checked')
          && $('#phones').prop('checked')) {
        checkedItems.push('all devices');
      } else {
        checkedItems = checkedItems.concat(items[2]);
      }
      if ($('#no_internet').prop('checked')
          && $('#infrequent').prop('checked')
          && $('#stable').prop('checked')) {
        checkedItems.push('all connection types');
      } else {
        checkedItems = checkedItems.concat(items[3]);
      }
      allCheckedItems = checkedItems.concat(items[0], items[4]);
      for (var i = 0; i < allCheckedItems.length; i++) {
        var passAllFilters = true;
        if ($('#' + allCheckedItems[i]).prop('checked') && txt.indexOf(allCheckedItems[i].replace(/_/g, ' ')) > -1) {
        } else {
          passAllFilters = false;
          break;
        }
        if (passAllFilters) {
          place.show();
        }
      }
    });
  });
});
