/*
 *	Drill 2 scripts
 *	https://github.com/gronostajo/drill2
 */


// Fisher-Yates shuffling algorithm
// Adapted from: http://bost.ocks.org/mike/shuffle/

function shuffle(obj) {
	var numToShuffle = obj.length;

	while (numToShuffle) {
		var pick = Math.floor(Math.random() * numToShuffle);
		numToShuffle--;

		var temp = obj[numToShuffle];
		obj[numToShuffle] = obj[pick];
		obj[pick] = temp;
	}

	return obj;
}


// Simple integer sequence starting from 0

function sequence(max) {
	var seq = [];
	for (var i = 0; i < max; i++) seq.push(i);
	return seq;
}


// Detect current Bootstrap breakpoint
// Adapted from: http://stackoverflow.com/a/19462847/1937994

function bootstrapBreakpoint() {
	var envValues = ["xs", "sm", "md", "lg"];

	var el = $('<div>');
	el.appendTo($('body'));

	for (var i = envValues.length - 1; i >= 0; i--) {
		var envVal = envValues[i];

		el.addClass('hidden-'+envVal);
		if (el.is(':hidden')) {
			el.remove();
			return envVal
		}
	};
}


// on DOM ready

$(function() {

	// read and set last stats panel state
	var statsPreference = $.cookie('stats');
	if (!statsPreference) {
		var initialBreakpoint = bootstrapBreakpoint();
		statsPreference = (initialBreakpoint == 'xs') ? 'collapsed' : 'expanded';
	}

	if (statsPreference == 'expanded') {
		$('#collapseScore').collapse('show');
		$.cookie('stats', 'expanded');
	}
	else {
		$.cookie('stats', 'collapsed');
	}

	// hook collapse and expand events to update cookie
	$('#collapseScore').on('show.bs.collapse', function () {
		$.cookie('stats', 'expanded');
	});
	$('#collapseScore').on('hide.bs.collapse', function () {
		$.cookie('stats', 'collapsed');
	});
});