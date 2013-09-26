$(document).ready(function(){

	/*==== PAGE INITS =====*/

    /*FANCYBOX ACTIVATION*/
    $(".fancybox").fancybox();

    $("#Message").val("once upon a time, in a land...");

	//Image preloads
	function preload(arrayOfImages) {
		$(arrayOfImages).each(function(){
			(new Image()).src = this;
		});
	}

	preload([
		'images/portfolio/kavalri/exampleInstance-kavalri-hover.jpg',
		'images/portfolio/eve/exampleInstance-eve-hover.jpg',
		'images/portfolio/jash/exampleInstance-jash-logo-hover.jpg',
		'images/portfolio/jash/exampleInstance-jash-hover.jpg',
		'images/portfolio/agm/exampleInstance-agm-hover.gif',
	]);




	/*===== PAGE SIZE FUNCTIONS =====*/
	var pageHeight = 0;

	function setSizes(){

		//Private function to get window height
		function getHeight(){
			var theHeight = window.innerHeight;

			if (typeof theHeight != "number"){
				if (document.compatMode == "CSS1Compat"){
					theHeight = document.documentElement.clientHeight;
				} else {
					theHeight = document.body.clientHeight;
				}
			}
			return theHeight;
		}

		pageHeight = getHeight();;
		var width =  $(window).width();

		$('.page').height( pageHeight );

		//Portfolio Example Major Blocks
		var HEADER_HEIGHT = 68;
		var halfHeight = Math.floor( (pageHeight-HEADER_HEIGHT) / 2);
		var halfWidth = Math.floor( width / 2);

		$('.example-page .blockA, .example-page .blockC').width( halfWidth );
		$('.example-page .blockB, .example-page .blockD').width( width - halfWidth -1);

		$('.example-page .blockA, .example-page .blockB').height( halfHeight );
		$('.example-page .blockC, .example-page .blockD').height( pageHeight - HEADER_HEIGHT - halfHeight);


		// Portfolio Example Mini Blocks
		var quarterWidth = Math.floor( (width - halfWidth - 1) / 2 );
		var quarterHeight = Math.floor( halfHeight / 2);

		$('.blockD .miniblockA, .blockD .miniblockC').width( quarterWidth );
		$('.blockD .miniblockB, .blockD .miniblockD').width( (width - halfWidth - 1) - quarterWidth);

		$('.blockD .miniblockA, .blockD .miniblockB').height( quarterHeight );
		$('.blockD .miniblockC, .blockD .miniblockD').height( (pageHeight - HEADER_HEIGHT - halfHeight) - quarterHeight);
	}

	//Establish initial page dimensions
	setSizes();

	//Wire up resizing
	$(window).resize( setSizes );





	/*===== WINDOW SCROLLING OVERRIDES =====*/
	var currentPage = -1;     //zero indexed
	var MAX_PAGE = 3;
	var newPage = 0;
	var currentCircle = $("#circle1");

	// Using the event helper
	var currentlyScrolling = false;


	$(".page").waypoint(function(direction){

		if (direction == "down"){
			currentPage++;
		}
		else if (direction == "up"){
			currentPage--;
		}

		//console.log("currentPage now: ", currentPage);

		//Update nav circle
		$("#navcircles .active").removeClass("active")
		$("#navcircles div").eq(currentPage).addClass("active");
	});


	//Mouse wheel override
	$('body').mousewheel(function(event, delta, deltaX, deltaY) {

		// console.log("Current Page Before: ", currentPage);
		// console.log("mousewheel deltaY: ", deltaY);

		//scroll down one page
		if (deltaY < 0){
			newPage = Math.min(currentPage+1, MAX_PAGE);
		}

		//scroll up one page
		else {
			newPage = Math.max(currentPage-1, 0);
			//console.log('newPage: ', newPage);
		}

		// console.log("Current Page After: ", currentPage);

		//if ( newPage != currentPage && !currentlyScrolling){
		if (!currentlyScrolling){

			currentlyScrolling = true;
			$.scrollTo( $('.page:eq('+newPage+')'), 500, {onAfter:function(){ currentlyScrolling = false;}});
		}

	});


	/*==== HOT BLOCKS ANIMATION ====*/

	/* STARTUP ANIMATION */
	function hotblockAnimateAndHide(){

		$('.fade-1',this).animate( {opacity: .2}, 500).animate( {opacity: 0}, 500);
		$('.fade-2',this).delay(300).animate( {opacity: .5}, 500).animate( {opacity: 0}, 500);
		$('.focus-block',this).delay(500).animate( {opacity: 1}, 800).animate({opacity: 0}, 500);

		$('.title', this).delay(600).animate( {opacity: .7}, 800).animate({opacity: 0}, 500);
		$('.fade-3',this).delay(900).animate( {opacity: .5}, 500).animate( {opacity: 0}, 500);
		$('.fade-4',this).delay(1200).animate( {opacity: .2}, 500).animate( {opacity: 0}, 500);		
	}

	hotblockAnimateAndHide.apply( $('#hotblock-1') );
	setTimeout( function(){ hotblockAnimateAndHide.apply( $('#hotblock-3') ); }, 400);
	setTimeout( function(){ hotblockAnimateAndHide.apply( $('#hotblock-4') ); }, 800);


	/* HOVER ANIMATION */
	function hotblockAnimate(){

		$('.fade-1',this).stop(true).animate( {opacity: .2}, 350).animate( {opacity: 0}, 350);
		$('.fade-2',this).stop(true).delay(100).animate( {opacity: .6}, 350).animate( {opacity: 0}, 350);
		$('.fade-3',this).stop(true).delay(250).animate( {opacity: .6}, 350).animate( {opacity: 0}, 350);
		$('.fade-4',this).stop(true).delay(350).animate( {opacity: .2}, 350).animate( {opacity: 0}, 350);		
	}

	function hotblockAnimateLighter(){

		$('.fade-1',this).stop(true).animate( {opacity: .2}, 350).animate( {opacity: 0}, 350);
		$('.fade-2',this).stop(true).delay(100).animate( {opacity: .5}, 350).animate( {opacity: 0}, 350);
		$('.fade-3',this).stop(true).delay(250).animate( {opacity: .5}, 350).animate( {opacity: 0}, 350);
		$('.fade-4',this).stop(true).delay(350).animate( {opacity: .2}, 350).animate( {opacity: 0}, 350);		
	}


	$('#hotblock-1 .focus-block').mouseenter( function(){
		$(this).stop(true).animate( {opacity: 1}, 250);
		$(this).siblings('.title').stop(true).animate( {opacity: .9}, 500);
		hotblockAnimate.apply( $(this).parent() );
	});

	$('#hotblock-3 .focus-block, #hotblock-4 .focus-block').mouseenter( function(){
		$(this).stop(true).animate( {opacity: 1}, 250);
		$(this).siblings('.title').stop(true).animate( {opacity: 1}, 500);
		hotblockAnimateLighter.apply( $(this).parent() );
	});


	$('.focus-block').mouseleave(function(){
		$(this).stop(true).animate({opacity: 0}, 300);
		$(this).siblings('.title').stop(true).animate({opacity: 0}, 300);
	});





	/* LINKS */
	$('#hotblock-1 .focus-block').click( function(){
		$.scrollTo("#portfolio-page1", 1000);
	});
	$('#hotblock-3 .focus-block').click( function(){
		$.scrollTo("#about", 1500);
	});
	$('#hotblock-4 .focus-block').click( function(){
		$.scrollTo("#contact", 2000);
	});





	/*==== PORTFOLIO ANIMATIONS ====*/
	$('.thumbnail').click(function(){

        //skip expanded example instances
        //if( $(this).hasClass("expanded") ) return;

		//scroll top of portfolio page
		$.scrollTo("#portfolio-page1");

        //hide navigation icons
        $("#navcircles").hide();

        //Set the major and minor block sizes
		setSizes();

        //Get the corresponding Example Page
        var pageId = "#" + $(this).attr("id").replace("thumb", "page");
        var $page = $(pageId);

        //Fade in the Example Page
        $page.fadeIn(500);

        //Show the Minor blocks once Example Page has mostly faded in
		setTimeout( function(){
            $('.miniblockB label', $page).delay(250).animate( { right: 23, opacity: 1}, 1500);                       //animate the screenshots label
            $('.miniblockA', $page).delay(250).animate( {opacity: .5}, 500).animate( {opacity: 1}, 250);  //glow the miniblocks
            $('.miniblockC', $page).delay(500).animate( {opacity: .5}, 500).animate( {opacity: 1}, 250);
            $('.miniblockD', $page).delay(750).animate( {opacity: .5}, 500).animate( {opacity: 1}, 250);
		}, 400);

	});


    /*=== HIDE EXAMPLE PAGES ===*/
    $(".example-page header").click(function(){

        //fade out page
        //reset label position for animation
        $(this).parent()
            .fadeOut()
            .find('.miniblockB label').css("right", "50px");

        //restore navigation icons
        $("#navcircles").show();
    });




	/*===== CONTACT FORM FUNCTIONS =====*/


	//PRIVATE UTILITY FUNCITONS

	//Check if a field has been filled in
	function checkFieldFilled(){

		var $this = $(this);


		if( $this.hasClass("unused") ){

			$this
				.removeClass("unused")
				.addClass("used")
				.val("")
				.animate( {width : "100%"} );
		}


		if( $this.val() == ""){

			$this
				.addClass('has-error')
				.siblings('.error-msg').fadeIn(300);

			return false;
		}

		else{
			$this
				.removeClass('has-error')
				.siblings('.error-msg').fadeOut(100);

			return true;
		}
	}


	//Check if an email address is of valid format
	function validateEmail(){

		var $this = $(this);

		if( $this.hasClass("unused") ){

			$this
				.removeClass("unused")
				.addClass("used")
				.val("")
				.animate( {width : "100%"} );
		}

		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if( !emailRegex.test( $this.val() ) ){

			$this
				.addClass('has-error')
				.siblings('.error-msg').fadeIn(300);
		}

		else{
			$this
				.removeClass('has-error')
				.siblings('.error-msg').fadeOut(100);

		}		
	}


	//VALDIATION EVENT HANDLERS

	//Validate fields on blur
	$("#Name").blur( checkFieldFilled );
	$("#Email").blur( validateEmail );
	$("#Message").blur( checkFieldFilled );

	//Validate fields on submit
	$("#Submit").click(function(){

		//validate fields
		checkFieldFilled.apply( $("#Name") );
		validateEmail.apply( $("#Email") );
		checkFieldFilled.apply( $("#Message") );

		//cancel submission if there are errors
		console.log( $(".has-error") );
		if( $(".has-error").length > 0 )
			return false;
		else
			return true;
	});


	$("#Name, #Email").focus( function(){

		var $this = $(this);

		if( $this.hasClass("unused") ){

			$this
				//mark as now used
				.removeClass("unused")
				.addClass("used")

				//clear contents
				.val("")

				//expand box to full width
				.animate( {width : "100%"} );
		}
	});


	$("#Message").focus( function(){

		var $this = $(this);

		if( $this.hasClass("unused") ){

			$this
				//mark as now used
				.removeClass("unused")
				//clear contents
				.val("")
				//expand box to full width
				.animate( {width : "100%", height: "15em"} )
				//allow scrollbars
				.css("overflow", "auto");


			$("#submit-block").slideDown();
		}

	});
});