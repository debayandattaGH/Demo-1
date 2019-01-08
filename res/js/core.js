(function(){

	// Demo data
	function getData(id = null){
		var data = [
			{ id: 1, img: 'res/data/1.jpg' },
			{ id: 2, img: 'res/data/2.jpg' },
			{ id: 3, img: 'res/data/3.jpg' },
			{ id: 4, img: 'res/data/4.jpg' },
			{ id: 5, img: 'res/data/5.jpg' },
			{ id: 6, img: 'res/data/6.jpg' },
			{ id: 7, img: 'res/data/7.jpg' }
		];


		if(id){
			for(var i=0; i < data.length; i++){
				if(id == data[i].id) return data[i];
			}
		}else{
			return data;
		}
	}


	// Navigation for our SPA happens here
	function renderPage(url){
		var urlPart = url.split('/')[0],
			render = {
			'' : function(){
				window.location.href = '#home';
			},

			'#home' : function(){
				$('#p_home').show();

			},

			'#one' : function(){
				var html = '',
					data = getData();

				for(var i=0; i < data.length; i++){
					html += "<a href='#details/" + data[i].id + "' class='list-group-item list-group-item-action'>";
					html += "	<img class='items' src='" + data[i].img + "' />";
					html += "</a>";
				}

				html = "<div class='list-group'>" + html + "</div>";
				$('#p_one .content').empty().append(html);
				$('#p_one').show();
			},

			'#two' : function(){
				var html = '',
					subHtml = '',
					data = getData();

				for(var i=0, j=1; i < data.length; i++, j++){
					subHtml += "<div class='col-sm-4'>";
					subHtml += "	<a href='#details/" + data[i].id + "'>";
					subHtml += "		<img class='items' src='" + data[i].img + "' />";
					subHtml += "	</a>";
					subHtml += "</div>";

					if(j % 3 == 0) {
						html += "<div class='row'>" + subHtml + "</div>";
						j = 0;
						subHtml = '';
					}
				}

				if(subHtml != ''){
					html += "<div class='row'>" + subHtml + "</div>";
				}

				html = "<div class='container-fluid'>" + html + "</div>";
				$('#p_two .content').empty().append(html);
				$('#p_two').show();
			},

			'#details': function(){
				var data = getData(url.split('/')[1]),
					html = '';

				html += 'Item Id: ' + data.id + '<br>';
				html += "<img class='item-details' src='" + data.img + "' />";

				$('#p_details .content').empty().append(html);
				$('#p_details').show();
			}
		};

		$('.pages').hide();
		render[urlPart]();

		// Spatial Navigation
		$('a')
		.SpatialNavigation()
		.focus(function() { $(this).css('outline', '2px solid red'); })
		.blur(function() { $(this).css('outline', ''); })
		.first()
		.focus();
	}




	$('.nav-link').click(function(){
		$('.nav-link').removeClass('active');
		$(this).addClass('active');
	});




	$(window).on('hashchange', function(){
		renderPage(decodeURI(window.location.hash));
	});


	renderPage(decodeURI(window.location.hash));
	console.log('Working ...');
})($);