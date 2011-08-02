$(document).ready(function() {
	$(".draggable").draggable({
		revert: true,
		stack: "#resources div",
		containment: 'window',
		scroll: false
		}
	);
	
	$("#static-droppable").droppable({
		accept: ".static-type",
		hoverClass: "droppable-hover",
		tolerance: "touch",
		drop: function(event, ui) {
			$(this).html(ui.draggable.find(".name").text());
		}
	})
	
	$("#dynamic-droppable").droppable({
		accept: ".dynamic-type",
		hoverClass: "droppable-hover",
		tolerance: "touch",
		drop: function(event, ui) {
			$(this).html(ui.draggable.find(".name").text());
		}
	})
});

var showConsole = true;
var dots;
function update() {
	if (!$("#slide").hasClass("animated")) {
		var static = $("#static-droppable").text();
		var dynamic = $("#dynamic-droppable").text();
		
		var result = checkCompiles(static, dynamic);
		
		var explanationh2 = "That works!";
		if (result == false) {
			explanationh2 = "Oh noez! That didn't work...";
		}
		$("#explanation").find("h2").html(explanationh2);
		
		$(".blue-pill").html("Compiling").attr("disabled", "disabled");
		
		dots = window.setInterval("appendCompilingDots();", 200);
		setTimeout("$(\".blue-pill\").html(\"Go Back!\").removeAttr(\"disabled\");", 1000);
		setTimeout("window.clearInterval(dots);", 1000);
		
		$("#slide").addClass("animated");
	} else {
		$(".blue-pill").html("\"Compile\"");
		$("#slide").removeClass("animated");
	}
}

function appendCompilingDots() {
	$(".blue-pill").append(".");
}