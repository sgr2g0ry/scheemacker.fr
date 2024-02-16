var nbTravels = 0;
var nbBreaks = 0;
var nbTravelsAbroad = 0;
var nbBreaksAbroad = 0;
var nbWeeksAbroad = 0;
var nbDaysAbroad = 0;
var nbTravelsFrance = 0;
var nbBreaksFrance = 0;
var nbWeeksFrance = 0;
var nbDaysFrance = 0;

$( document ).ready(function() {
  //data
  $.getJSON("/travels/travels.json", function(data) {
    setGenericStats(data);
    setLittlePosts(data);
    setMiniPosts(data);
    setMainPosts(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    var errorMsg = jqXHR.status + ' : ' + textStatus + errorThrown;
    console.log("An error has occurred:" + errorMsg);
  });
});

function setGenericStats(data) {
  nbTravels = 0;
  nbBreaks = 0;
  $.each(data.trips, function(i, item) {
    if (item.type == "BREAK") {
      nbBreaks++;
      if (item.abroad) {
        nbBreaksAbroad++;
        nbDaysAbroad += item.duration;
      }
      else {
        nbBreaksFrance++;
        nbDaysFrance += item.duration;
      }
    }
    else if (item.type == "TRAVEL") {
      nbTravels++;
      if (item.abroad) {
        nbTravelsAbroad++;
        nbWeeksAbroad += item.duration;
      }
      else {
        nbTravelsFrance++;
        nbWeeksFrance += item.duration;
      }
    }
  });
  $('#generic_stats').html(nbTravels + " travels + " + nbBreaks + " breaks<br>over " + data.countries.length + " countries");
}

function setMiniPosts(data) {
  var item = data.trips[1];
  var html = '';
  html += '<article class="mini-post">';
  html += ' <header>';
  html += '   <h3>' + item.title_en + '</h3>';
  html += '   <time class="published">' + getMonthLitteral(item.month) + ' ' + item.year + ' / ' + item.type + ' / ' + getLiteralDuration(item) + '</time>';
  html += ' </header>';
  html += ' <img src="images/main/' + item.main_img + '" alt="" />';
  html += '</article>';
  $('#mini_posts').html(html);
}

function setLittlePosts(data) {
  var html = "";
  $.each(data.trips, function(i, item) {
    var post = '';
    if (item.code == "WORLDMAP") {
   post += '<li>';
   post += ' <article>';
   post += ' <header>';
   post += ' <h3>' + item.title_en + '</h3>';
   post += ' <time class="published">Since year 2000</time>';
   post += ' </header>';
   if (item.main_img) {
     post += ' <a class="image"><img src="images/main/' + item.main_img + '" alt="" /></a>';
   }
   post += ' </article>';
   post += '</li>';
} else {
   post += '<li>';
   post += ' <article>';
   post += ' <header>';
   post += ' <h3>' + item.title_en + '</h3>';
   post += ' <time class="published">' + getMonthLitteral(item.month) + ' ' + item.year + ' / ' + item.type + ' / ' + getLiteralDuration(item) + '</time>';
   post += ' </header>';
   if (item.main_img) {
     post += ' <a class="image"><img src="images/main/' + item.main_img + '" alt="" /></a>';
   }
   post += ' </article>';
   post += '</li>';
}
html += post;
  });
  $('#little_posts').html(html);
}

function setMainPosts(data) {
  var html = "";
  $.each(data.trips, function(i, item) {
    var post = '';
    if (item.code == "WORLDMAP") {
      post += '<article class="post">';
      post += ' <header>';
      post += ' <div class="title">';
      post += ' <h2>' + item.title_en + '</h2>';
      post += ' <p>' + getAllLiteralCountries(data) + '</p>';
      post += ' </div>';
      post += ' <div class="meta">';
      post += ' <time class="published">Since year 2000</time>';
      post += ' <p>' + item.area + '</p>';
      post += ' </div>';
      post += ' </header>';
      if (item.main_img) {
        post += ' <img src="images/main/' + item.main_img + '" class="image featured" alt="" />';
      }
      post += ' <p>' + getMainOverview(item) + '</p>';
      post += '</article>';
    }
    else {
      post += '<article class="post">';
      post += ' <header>';
      post += ' <div class="title">';
      post += ' <h2>' + item.title_en + '</h2>';
      post += ' <p>' + getLiteralCountries(item.countries) + '</p>';
      post += ' </div>';
      post += ' <div class="meta">';
      post += ' <time class="published">' + getMonthLitteral(item.month) + ' ' + item.year + '</time>';
      post += ' <p>' + item.type + ' / ' + getLiteralDuration(item) + '</p>';
      post += ' <p style="font-weight:bold;">' + item.area + '</p>';
      post += ' </div>';
      post += ' </header>';
      if (item.main_img) {
        post += ' <img src="images/main/' + item.main_img + '" class="image featured" alt="" />';
      }
      post += ' <p>' + getOverview(item) + '</p>';
      post += '</article>';
    }
    html += post;
  });
  $('#main').html(html);
}

function getOverview(item) {
  var html = "";
  if (item.places == undefined && item.facts == undefined) {
    return "<p>TO BE COMPLETED</p>";
  }
  html += '<h3>Overview</h3>';
  html += '  <div class="row">';
  html += '    <div class="col-6 col-12-medium">';
  html += '      <h4>Places</h4>';
  html += '      <ul>';
  $.each(item.places, function(i, place) {
    html += '        <li>' + place + '</li>';
  });
  html += '      </ul>';
  html += '    </div>';
  if (item.facts !== undefined) {
    html += '    <div class="col-6 col-12-medium">';
    html += '      <h4>Facts</h4>';
    html += '      <ul>';
    $.each(item.facts, function(i, fact) {
      html += '        <li>' + fact + '</li>';
    });
    html += '      </ul>';
    html += '    </div>';
    html += '  </div>';
  }
  return html;
}

function getMainOverview(item) {
  var html = "";
  html += '<h3>Overview</h3>';
  html += '  <div class="row">';
  html += '    <div class="col-6 col-12-medium">';
  html += '      <h4>Counters</h4>';
  html += '      <ul>';
  html += '        <li> Abroad: ' + (nbWeeksAbroad * 7 + nbDaysAbroad) + ' days / ' + nbTravelsAbroad + ' travels / ' + nbBreaksAbroad + ' breaks</li>';
  html += '        <li> France: ' + (nbWeeksFrance * 7 + nbDaysFrance) + ' days / ' + nbTravelsFrance + ' travels / ' + nbBreaksFrance + ' breaks</li>';
  html += '      </ul>';
  html += '    </div>';
  html += '    <div class="col-6 col-12-medium">';
  html += '      <h4>Main Facts</h4>';
  html += '      <ol>';
  $.each(item.facts, function(i, fact) {
    html += '        <li>' + fact + '</li>';
  });
  html += '      </ol>';
  html += '    </div>';
  html += '  </div>';
  return html;
}

function getLiteralCountries(countries) {
  var list = "";
  $.each(countries, function(i, item) {
    if (list != "") list += ", ";
    list += item;
  });
  return list;
}

function getAllLiteralCountries(data) {
  var list = "";
  $.each(data.countries, function(i, item) {
    if (list != "") list += ", ";
    list += item.code;
  });
  return list;
}

function getLiteralDuration(trip) {
  var duration = "";
  if (trip.type == "TRAVEL") {
    if (trip.duration == 1) {
      duration = "1 week";
    } else {
      duration = trip.duration + " weeks";
    }
  }
  else if (trip.type == "BREAK") {
    if (trip.duration == 1) {
      duration = "1 day";
    } else {
      duration = trip.duration + " days";
    }
  }
  return duration;
}

function getMonthLitteral(month) {
  switch(month) {
   case 1:
     return "January";
     break;
   case 2:
     return "February";
     break;
   case 3:
     return "March";
     break;
   case 4:
     return "April";
     break;
   case 5:
     return "May";
     break;
   case 6:
     return "June";
     break;
   case 7:
     return "July";
     break;
   case 8:
     return "August";
     break;
   case 9:
     return "September";
     break;
   case 10:
     return "October";
     break;
   case 11:
     return "November";
     break;
   case 12:
     return "December";
     break;
   default:
     return "";
  }
}