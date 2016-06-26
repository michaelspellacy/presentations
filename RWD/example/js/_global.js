/* 
	Responsive Web Design- Global Functions
	Michael Spellacy, Lead UI Developer <michael.spellacy@tmp.com>, TMP Worldwide, LLC
*/

/* ====== jQuery Functionality ====== */

$(function() { // Begin Document Ready

	/* ====== Device Independent Functionality ====== */

	$("html").attr("class", "js"); // Make template JS active
	
	// Hide input/textarea placeholder text on focus, return on blur

	function populateElement(selector, defvalue) {

		$(selector).each(function() {

			if($.trim(this.value) == "") {

				this.value = defvalue;

			}

		});

		$(selector).focus(function() {

			if(this.value == defvalue) {

				this.value = "";

			}

		});

		$(selector).blur(function() {

			if($.trim(this.value) == "") {

				this.value = defvalue;

			}

		});

	}

	var loginEmailLabel = $("#job-alert-signup label.wai.email").text();
	var loginEmailText = $("#job-alert-signup input.text.email");
	var loginPasswordLabel = $("#job-alert-signup label.wai.password").text();
	var loginPasswordText = $("#job-alert-signup input.text.password");

	loginEmailText.val(loginEmailLabel);
	
	populateElement(loginEmailText, loginEmailLabel);

	loginPasswordText.val(loginPasswordLabel);

	populateElement(loginPasswordText, loginPasswordLabel);

	/* ====== Device Specific Functionality ====== */

	if ($(window).width() <= 480) {

		$("html").addClass("mobile"); // Append mobile class to page

		// Additional Functionality Here...

		alert("Hello, Mr. Small Screen! Your Viewport size is " + $(window).width() + " pixels wide");

	} else {

		// Target blank that validates

		$("a[class*='external']").click(function(){

			this.target = "_blank";

		});

	}

}); // End Document Ready
