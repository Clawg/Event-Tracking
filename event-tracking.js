// Used for testing clickthroughs, details added to google analytics
// Just a comment for testing
	function tracking() {

		$('[data-track-wname]').click( function(e) {
			
				e.preventDefault();
				var $target = $(e.target); 

				// If this link is clicked get the widget name and widget view
				if ( $target.is('a') || $target.parent().is('a') ) {
					var container = $target.closest('[data-track-wname]').eq(0);
					var wname = container.attr('data-track-wname');
					var wview = container.attr('data-track-wview');
				}						
				
				// If a link is clicked
					if($target.is('a') ) {						
						var linkText = removeSpaces($(e.target).text())
						if (linkText.length == 0) linkText = $(e.target).attr('href');
						//_gaq.push(['_trackEvent', areaTitle, linkText, 'ANCHOR']);						
					}; 	
									
					
				// If an element containing text that is wrapped by a link
					if($target.parent().is('a')) {
						
						
						if( $target.is('span') || $target.is('abbr') || $target.is('strong') || $target.is('b') ) {						
							var linkText = removeSpaces($(e.target).text())							
						}; 

						if( $target.is('img') ) {
							if ($target.attr('alt') !=  undefined) {
								var linkText = removeSpaces($(e.target).attr('alt'));
								if (linkText.length == 0) linkText = $(e.target).parent().attr('href');	
							} else {
								linkText = $(e.target).parent().attr('href');	
							}
						}; 
						
					}				
					
				// Pass to Google tracking	
					console.log(wname + ' ' + wview + ' ' + linkText);	
					//_gaq.push(['_trackEvent', areaTitle, altText, 'IMG'])
					
					
		})
	}
	
	// Remove whitespace from string
		function removeSpaces(string) {
		 return string.split(' ').join('');
		}
	

