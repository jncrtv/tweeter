/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    for (let tweet in tweets) {
      $(".container").append(createTweetElement(tweets, tweet));
    }
  }

  const createTweetElement = function(tweetsObj, tweet) {
    let $tweet = $(`
      <article class="tweet">
        <header>
          <h3>${tweetsObj[tweet].user.name}</h3>
          <h3 class="tweeter-handle">${tweetsObj[tweet].user.handle}</h3>
        </header>
        <section>
          <p>${tweetsObj[tweet].content.text}</p>
        </section>
        <footer>
          <h4>${tweetsObj[tweet].created_at} days</h4>
        </footer>
    </article>`);
    
    
    return $tweet;
  }

  

  $("#submit-tweet").on('submit', function(event) {
  
    event.preventDefault();

    $(".container").empty();

    $.ajax({url: '/tweets', method: 'POST', data: $(this).serialize()})
    .then(function() {
      
      console.log('Success... Tweet Submitted');
      loadTweets();

    })
  })

  const loadTweets = function() {
    $.ajax({url: '/tweets', method: 'GET', dataType: 'JSON'})
    .then(function(data) {
      
      renderTweets(data);
      console.log('Success... Rendered Tweets')

    })
  }
});







// $("#submit-tweet").on('submit', function(event) {

//   event.preventDefault();

//   $.ajax({url: '/tweets', method: 'GET', dataType: 'JSON'})
//   .then(function(data) {
    
//     renderTweets(data);
//     console.log('Success... Rendered Tweets')

//   })
// })



  // $.ajax({url: '', method: '', dataType: ""}).then(function(response) {
  //   //...
  // })
  // $('form').on('submit', (evt) => { evt.preventDefault(); 

  // How do I get the value of what i typed INTO my search URL? 
  // How do i bundle the data i need to send to the user ( hint hint serilize? ) 

  // $.ajax({ url: `https://www.google.com/`, method: 'GET', dataType: 'JSON' })
  //  .then(function(response) { console.log(response); 
  //    const item = createItem(response[0]) 
  //    $('#results').empty(); createItems(response); 
  //  }) })

/*
$(function() {
  const $button = $('#load-more-posts');
      $button.on('click', function () {
        console.log('Button clicked, performing ajax call...');
        $.ajax('more-posts.html', { method: 'GET' })
        .then(function (morePostsHtml) {
          console.log('Success: ', morePostsHtml);
          $button.replaceWith(morePostsHtml);
        });
      });
});
*/

// event.preventDefault()

// .serialize()