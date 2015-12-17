$(document).ready(function(){
	var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/'

  $.ajax('http://devpoint-ajax-example-server.herokuapp.com/api/v1/users', {
  type: 'GET',
  success: function(data) {
    // data.users = array
    // iterate data.users
    if(data.users.length) {
      for(var i = 0; i < data.users.length; i++) {
        var user = data.users[i];
        // populate users_list element with each users first name
        // use the jquery append method on users_list
        $('#users_list').append('<li><a class="user_item" href=' + user.id + '>' + user.first_name + '</a><br /><button>Edit</button> - <button class="user_delete">Delete</button></li>');
      }
    } else {
      $('#message_div').text('No users found. Please add one!').slideToggle();
    }
  },
  error: function(data) {
    
  	}
	});

  $(document).on('click', '.user_delete', function() {
    var $parent = $(this).parent();
    var userId = $parent.find('.user_item').attr('href');
    $.ajax( baseUrl + 'users/' + userId, {
      type: 'DELETE',
      success: function(data) {
        $parent.slideToggle();
      },
      error: function(data) {
        alert('The user was not deleted. Please try again.');
      }
    });
  });

  $(document).on('click', '.user_item', function(e){
    e.preventDefault();
    var userId = $(this).attr('href');
    $.ajax(baseUrl+ 'users/' + userId, {
      type: 'GET',
      success: function(data) {
        var user = data.user;
        $('#user_name').text(user.first_name + ' ' + user.last_name);
        $('#user_phone').text(user.phone_number);
      },
      error: function(data) {
        debugger
      }
    });
  });

  $('#create_user_form').submit(function(e){
    e.preventDefault();
    $.ajax(baseUrl + 'users', {
      type: 'POST',
      data: {'user': {'first_name': 'Ladd', 'last_name': 'Laulusa', 'phone_number': '5205768184'}},
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log(data);
      }
    });
  });
});































