console.log('js is running');

$.ajax({
	url: 'http://192.168.33.10:3000/allProducts',
	dataType: 'json',
	type: 'GET',
	success: function(data) {
		console.log(data);
	},
	error: function(error) {
		console.log('Error getting products');
		console.log(error);
	}
});
