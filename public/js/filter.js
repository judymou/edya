function App() {
  var me = this;
  App.prototype.init = function () {
    var items = [
      ['extracurricular reading', 'classroom content support', 'classroom experience'],
      ['primary', 'middle', 'high', 'university'],
      ['computer', 'tablet', 'eReader', 'phone'],
      ['no internet', 'infrequent', 'stable'],
      ['free']
      ];
    var tags = [
      'Goals', 'Grade', 'Device', 'Internet', 'Cost'
    ];
    for (var i = 0; i < tags.length; i++) {
      $('.' + tags[i].toLowerCase().replace(/ /g, "_")).append('<h4>' + tags[i] + ':</h4>');
      for (var j = 0; j < items[i].length; j++) {
        var label = $('<label>');
        label.append($('<input type="checkbox"/>').attr('id', items[i][j].toLowerCase().replace(/ /g, '_')));
        if (items[i][j] == 'primary' || items[i][j] == 'middle' || items[i][j] == 'high') {
          label.append(items[i][j] += " school");
        } else {
          label.append(items[i][j]);
        }
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
        var checkItems = [];
        checkItems = checkItems.concat(me._getCheckedItemsNoTag(items[0]));
        //checkItems = checkItems.concat(me._getCheckedItems(items[1], 'all grades'));
        checkItems = checkItems.concat(me._getCheckedItems(items[2], 'all devices'));
        checkItems = checkItems.concat(me._getCheckedItems(items[3], 'all connection types'));
        checkItems = checkItems.concat(me._getCheckedItemsNoTag(items[4]));
        var passAllFilters = true;
        for (var i = 0; i < checkItems.length; i++) {
          if ($('#' + checkItems[i]).prop('checked') && txt.indexOf(checkItems[i].replace(/_/g, ' ')) < 0) {
            passAllFilters = false;
            break;
          }
        }
        if (passAllFilters) {
          for (var i = 0; i < items[1].length; i++) {
            if ($('#' + items[1][i]).prop('checked') && txt.indexOf(items[1][i].replace(/_/g, ' ')) < 0
              && txt.indexOf("all grades") < 0) {
              passAllFilter = false;
              break;
            }
          }
          if (passAllFilters) {
            place.show();
          }
        }
      });
    });
  };

  App.prototype._getCheckedItems = function(a, newTag) {
    var itemChecked = [];
    for (var i = 0; i < a.length; i++) {
      if ($('#'+a[i]).prop('checked')) {
        itemChecked.push(a[i]);
      }
    }
    if (itemChecked.length == a.length) {
      return [newTag];
    }
    return itemChecked;
  }
  App.prototype._getCheckedItemsNoTag = function(a) {
    var itemChecked = [];
    for (var i = 0; i < a.length; i++) {
      if ($('#'+a[i]).prop('checked')) {
        itemChecked.push(a[i]);
      }
    }
    return itemChecked;
  }
}
$(function() {
  window.app = new App();
  window.app.init();
});
