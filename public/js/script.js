var submit = document.querySelector('form');

submit.addEventListener('submit', something, false);

function something(e) {
	e.preventDefault();
	const formData = new FormData(e.target);
	ajax(formData.get('stock'));
}

function ajax(filter) {
	$.ajax({
		url: 'http://192.168.33.10:3000/' + filter,
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
}
