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

function createEmptySpace(number) {
	var string = "";
	for (var i = 0; i < number; i++) {
		string += "&nbsp;";
	}
	return string;
}

var showConsole = true;
var dots;
function update() {
	if (!$("#slide").hasClass("animated")) {
		var static = $("#static-droppable").text();
		var dynamic = $("#dynamic-droppable").text();
		
		var result = checkCompiles(static, dynamic);
		
		var terminal = "<p>Tanner-Smiths-MacBook-Pro:~ tanner$ javac Test.java</p><p>Tanner-Smiths-MacBook-Pro:~ tanner$ <span id=\"cursor\">_</span></p>";
		var explanationh2 = "That works!";
		var explanation = "<p>Well, everything turned out to be ok. Good job!</p>";
		if (result < 0) {
			explanationh2 = "Oh noez! That didn't work...";
		}
		
		if (result == DYN_ABS_INF_ERR) {
			terminal = "<p>Tanner-Smiths-MacBook-Pro:~ tanner$ javac Test.java</p>";
			terminal += "<p>Test.java:3: "+dynamic+" is abstract; cannot be instantiated</p>";
			terminal += "<p>"+createEmptySpace(8)+static+" object = new "+dynamic+"();</p>";
			terminal += "<p>"+createEmptySpace(18 + static.length)+"^</p>";
			terminal += "<p>1 error</p>";
			terminal += "<p>Tanner-Smiths-MacBook-Pro:~ tanner$ <span id=\"cursor\">_</span></p>";
			
			explanation = "<p>Why didn't this work?</p>";
			explanation += "<p>Take a look at the error message:</p>";
			explanation += "<blockquote>\""+dynamic+"\" is abstract; cannot be instantiated\"</blockquote>";
			explanation += "<p>This means that either "+dynamic+" is either an abstract class or an interface. If we look at the table above, we can see that "+dynamic+" is indeed an ";
			explanation += (getObjectForName(dynamic).interface ? "interface" : "abstract class") + ".</p>";
			explanation += "<p>If you remember, interfaces and abstract classes <strong>cannot</strong> be instantiated. This means, that it would be impossible for that statement to run and Java catches that.</p>";
		}
		
		if (result == DYN_IMPL_ERR || result == HERITAGE_ERR) {
			terminal = "<p>Tanner-Smiths-MacBook-Pro:~ tanner$ javac Test.java</p>";
			terminal += "<p>Test.java:3 incompatible types</p>";
			terminal += "<p>found	"+createEmptySpace(2)+": "+dynamic+"</p>";
			terminal += "<p>required: "+static+"</p>";
			terminal += "<p>"+createEmptySpace(8)+static+" object = new "+dynamic+"();</p>";
			terminal += "<p>"+createEmptySpace(18 + static.length)+"^</p>";
			terminal += "<p>1 error</p>";
			terminal += "<p>Tanner-Smiths-MacBook-Pro:~ tanner$ <span id=\"cursor\">_</span></p>";
			
			explanation = "<p>Why didn't this work?</p>";
			explanation += "<p>Take a look at the error message:</p>";
			explanation += "<blockquote><p>Test.java:3 incompatible types</p>";
			explanation += "<p>found	"+createEmptySpace(2)+": "+dynamic+"</p>";
			explanation += "<p>required: "+static+"</p></blockquote>";
		}
		
		if (result == DYN_IMPL_ERR) {
			explanation += "<p>We can get this error in two ways - by having the wrong interface for the static type or the wrong class that implements the interface for the dynamic type.</p>";
		}
		
		if (result == HERITAGE_ERR) {
			explanation += "<p>We get this error because there is no common ancestor between the static and dynamic types or you're trying to put something more general ("+dynamic+") into something more specific ("+static+").</p>"
		}
		
		$("#terminal").html(terminal);
		$("#explanation").find("h2").html(explanationh2);
		$("#explanation").find("#text").empty();
		$("#explanation").find("#text").append(explanation);
		
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

var cursor = window.setInterval("blinkCursor();", 500);
function blinkCursor() {
	if ($("#cursor").text() == "_") {
		$("#cursor").html("");
	} else {
		$("#cursor").html("_");
	}
}