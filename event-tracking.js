/* 
Author C.Law
Script works in conjunction with Google Analytics event tracking to track clicks on any anchor element.

Instead of being required to attach events to individual elements, this script uses a combination of 
attribute selectors and event bubbling to identify what has been clicked on and push it to GA.

Within the HTML the containing element should contain the data attribute data-track-wname, a click event is added to any element
that has this attribute.  When any element that sits within this container is clicked, the event bubbles up and identifies what element 
was clicked on.  Additional (though not necssary) data attributes have been added to pass additional information through.  This will be
dependant on the data you wish to capture.

As its the target that is retured and tests are required to check that it is an <a> tag, and if not find the closest <a>

HTML container would look like so

<div data-track-wname="navigation" data-track-wview="tertiarynavigation"></div>

*/



// Used for testing clickthroughs, details added to google analytics
	function tracking() {
		// A few elements need targeted specifically, but generally the click can be trapped via the attribute selector
		$('[data-track-wname]').click( function(e) {
			
				e.preventDefault();
				
				var $target = $(e.target); 
				var container = $target.closest('[data-track-wname]').eq(0);
				var wname = container.attr('data-track-wname');
				var wview = container.attr('data-track-wview');
				
				// If the element clicked is a sibling of an anchor element
					if ($target.closest('a').length > 0) {
						if($target.is('a') ) { // If the target is an anchor tag	 					
							var linkText = removeSpaces($(e.target).text())						
							if (linkText.length == 0) linkText = $(e.target).attr('href');						
						} else if($target.is('img') ) { // If the target is an image
							if ($target.attr('alt') !=  undefined) { // If the image has a alt attribute
								var linkText = removeSpaces($(e.target).attr('alt'));
								if (linkText.length == 0) linkText = $(e.target).closest('a').attr('href');	// If the alt attriubte has no text use the surrounding anchors href value
							} else {
								linkText = $(e.target).closest('a').attr('href');
							}
						} else {
							var linkText = removeSpaces($(e.target).text())
						}
						_gaq.push(['_trackEvent', wname, wview, linkText]);						 											
					}
				
				// Track button clicks too
					if($target.is('button') || $target.parent().is('button')) {		
							var linkText = removeSpaces($(e.target).text())
							_gaq.push(['_trackEvent', wname, wview, linkText]);						
					}								
		})
	}
	
// Remove whitespace from string
	function removeSpaces(string) {
		return string.split(' ').join('');
	}
