---
layout: null
---
 /* 

  TMP Worldwide: Accessible Navigation Example
  UID: Michael "Spell" Spellacy (michael.spellacy@tmp.com, @spellacy)

*/

// Begin: Primary Navigation

var $primaryNav = $("#primary-nav");
var $primaryNavList = $("#primary-nav-list");
var $primaryNavListBtn = $(".primary-nav-heading");
var $activeState = "active";

// Inject navigation button into the DOM

$primaryNav.prepend("<button id='primary-button' aria-expanded='false'><b>Menu</b></button>");

// Apply button ID to variable

var $primaryNavBtn = $("#primary-button");

// Open Navigation & Subnavigation Function

function toggleNav(obj, parent) {

// Let's make the "button" we access toggle when clicked
// Note: We are setting ARIA to indicate to screen readers when navigation is expanded.

if(obj.hasClass($activeState)) {

  // Set ARIA to false, remove class

  obj.attr("aria-expanded", "false").removeClass($activeState).next().removeClass($activeState);

} else {

  // $("html, body").scrollTop(0);

  // Remove class, reset ARIA from any currenty active items that may be open (we can only have one section open at a time)

  parent.find("." + $activeState).removeClass($activeState).attr("aria-expanded", "false");

  // Now add ARIA and class to content we want shown. 

  obj.attr("aria-expanded", "true").addClass($activeState).next().addClass($activeState);

}

}

// Reset Navigation

function resetNav() {

$primaryNav.removeClass($activeState);
$primaryNavList.removeClass($activeState);
$primaryNav.find("." + $activeState).removeClass($activeState);
$primaryNavBtn.attr("aria-expanded", "false");
$primaryNavListBtn.attr("aria-expanded", "false");

// Remove Button Focus

$primaryNavBtn.blur(); 

}

// Menu Button

$primaryNavBtn.on("click", function() {

toggleNav($(this), $primaryNav);

});

// Sub Navigation Button  

// Add ARIA and other attributes, along with event 

$primaryNavListBtn.attr({

"aria-expanded": "false", 
"role": "button", 
"tabindex": "0" 

}).on("click keypress", function() {

toggleNav($(this), $primaryNavList);

});

// Reset navigation...

// ...when clicking outside of menu or focusing on element directly outside of nav

$("html").on("click focus", function() {

resetNav();

});

// ...when leaving menu with mouse (but only on non-touch interfaces)

var mediaQuery = window.matchMedia("(min-width: 48em)");

mediaQuery.addListener(navResize);

function navResize(mediaQuery) {

if(mediaQuery.matches){

  // HACK: Need to test window size to apply events to certain elemts at certain screen widths. 

    $primaryNavList.on("mouseleave", function() {

      resetNav();

    });

  } else {

    $primaryNavList.unbind();

}

}

navResize(mediaQuery);

// ...when accessing escape key

$(document).on("keyup", function(e) {

if (e.keyCode === 27) {
    
  resetNav();

}

});

// With all of these events, we need to ensure that none take place when accessing navigation itself...

$primaryNav.on("click", function(e) {

e.stopPropagation();

});

// Navigation Highlight

// Inject hidden element into the DOM. This will be used to aid assistive technology, such as screen readers.

$primaryNav.append("<div hidden id='current-selection'>Current Page</div>"); 

// See if body id matches nav id. if it does, then two things must happen:
// 1. Change the href to "#current". Rather than reload same page, user is dropped down to current content
// 2. Add ARIA DescribedBy. This will link current-selection, which will be read aloud to screen reader.
// Note: ARIA can be used as a styling hook as well.  

$("#nav-" + $("body").attr("id") + " a").attr({

	"href":"#content", 
	"aria-describedby":"current-selection"

});

// End: Primary Navigation