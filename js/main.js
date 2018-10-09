$(document ).ready(function() {

  $("#tweet").on('click', function(){
      $('.tweet_action').toggleClass('show');
    });
$(".tweetle").on('click', function(){
    $("#tweet").trigger('click');
    });


$('.takip-et').on('click', function() {
  $(this).html($(this).data('text'));
  if ($(this).data('text') == 'Takibi Bırak') {
    $(this).data('text', 'Takip Et')
  } else {
    $(this).data('text', 'Takibi Bırak')
  }
});

const maxTweetLength = 280;
const urlLength = 23;
const placeholder = "Neler Oluyor?";
const urlRegex = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g;

var overLimit = false;
var diff = 0;
var virtualMaxTweetLength = maxTweetLength;

var tweet = document.getElementById('tweet');
var highlighter = document.getElementById('tweet_highlights');
var tweetChars = document.getElementById('tweet_chars');
var tweetBtn = document.getElementById('tweet_btn');

tweet.addEventListener('input', refresh);
tweet.addEventListener('keydown', refresh);
tweetChars.innerHTML = maxTweetLength;
highlighter.innerHTML = placeholder;



function refresh()
{
  diff = calcChars();
  tweetChars.innerHTML = diff;
  handleStates(diff);
  parseTweet();
  handlePlaceholder(diff);
}


function calcChars()
{
  var charCount = tweet.innerText.length;
  var urls = tweet.innerText.match(urlRegex);
  var alter = 0;
  virtualMaxTweetLength = maxTweetLength;

  if(urls)
  {
    var totalUrls = 0;
    alter = urlLength * urls.length;

    for(i in urls)
    {
      totalUrls += urls[i].length;
    }

    charCount = (tweet.innerText.length - totalUrls) + alter;
    virtualMaxTweetLength = (maxTweetLength - alter) + totalUrls;
  }

  return maxTweetLength - charCount;
}


function handleStates(diff)
{
  if(diff<0)
  {
    overLimit = true;
    tweetChars.className = 'warning';
  }
  else if(diff>=0)
  {
    overLimit = false;
    tweetChars.className = '';
  }

  if(diff < 0 || diff == maxTweetLength)
  {
    tweetBtn.disabled = true;
  }
  else
  {
    tweetBtn.disabled = false;
  }
}

function handlePlaceholder(diff)
{
  if(diff == maxTweetLength)
  {
      highlighter.innerHTML = placeholder;
      highlighter.className = 'placeholder';
  }
  else
  {
    highlighter.className = '';
  }
}

function parseTweet()
{
  var str = tweet.innerText;

  if(overLimit)
  {
    var danger = '<span class="danger">' + str.substr(virtualMaxTweetLength, str.length) + '</span>';
    str = str.replaceAtWith(virtualMaxTweetLength, danger);
  }

  str = str.replace(/\n/g, '<br>');

  str = str.replace(/(#|@)\w+/g, function(value){
    return '<span class="link">' + value + '</span>';
  });

  str = str.replace(urlRegex, function(value){
    return '<span class="link">' + value + '</span>';
  });

  highlighter.innerHTML = str;
}


String.prototype.replaceAtWith=function(index, replacement)
{
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
});
