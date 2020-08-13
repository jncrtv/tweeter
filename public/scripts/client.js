/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */ 

$(document).ready(function () {
  $(".error-message").hide();

  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    for (let tweet in tweets) {
      $(".container").prepend(createTweetElement(tweets, tweet));
    }
  }

  //XSS escape function
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function(tweetsObj, tweet) {
    let $tweet = $(`
      <article class="tweet">
        <header>
          <h3>${tweetsObj[tweet].user.name}</h3>
          <h3 class="tweeter-handle">${tweetsObj[tweet].user.handle}</h3>
        </header>
        <section>
          <p>${escape(tweetsObj[tweet].content.text)}</p>
        </section>
        <footer>
          <h4>${moment(tweetsObj[tweet].created_at).startOf('hour').fromNow()}</h4>
          <div class="icons">
            <img src="/images/retweet.png"/>
            <img src="/images/retweet.png"/>
            <img src="/images/retweet.png"/>
          </div>
        </footer>
    </article>`);
    
    // <h4>${moment().endOf('day').fromNow()} days</h4>
    //<h4>${tweetsObj[tweet].created_at} days</h4>

    return $tweet;
  }

  $("#submit-tweet").on('submit', function(event) {
    
    event.preventDefault();  //prevents request from loading /tweets
    
    let tweetContent = $(this).find("#tweet-text").val()  //accessing value in text area
    let tweetLength = tweetContent.length;
    

    //execute ajax POST method if char limit is met
    if (tweetLength < 141 && tweetLength > 0) {
      $(".container").empty();
      $(".error-message").hide();
  
      $.ajax({url: '/tweets', method: 'POST', data: $(this).serialize()}) //
      .then(function() {
        console.log(this)
        console.log('Success... Tweet Submitted');
        loadTweets();
  
      })
    } else if (tweetLength === 0) {
      
      $(".error-message").html('You forgot to say something. Share your thoughts #kthxbye').slideDown();
      
    } else {
      
      $(".error-message").html('Plz respect our 140 character limit. #kthxbye').slideDown();
      
    }
  });

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
// }){/* <script>alert('hello!');</script> */}


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