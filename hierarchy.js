var DYN_ABS_INF_ERR = -1;
var DYN_IMPL_ERR = -2;
var HERITAGE_ERR = -3;

function file(abstract, interface, name, parent, implements) {
	this.abstract = abstract;
	this.interface = interface;
	this.name = name;
	this.parent = parent;
	this.implements = implements;
}

function checkPolymorphism(static, dynamic) {
	console.log("Checking polymorphism between "+static.name+" and "+dynamic.name);
	
	// The dynamic type is either an abstract class or interface
	if (dynamic.abstract == true || dynamic.interface == true) {
		return DYN_ABS_INF_ERR;
	}
	
	// If the dynamic type implements anything, is it the static type?
	if (dynamic.implements != null && dynamic.implements.name != static.name) {
		return DYN_IMPL_ERR;
	}
	
	// Is there a common heritage?
	var parent = dynamic;
	var matchingHeritage = false;
	for (parent = dynamic; parent != null; parent = parent.parent) {
		if (static.name == parent.name) {
			matchingHeritage = true;
		}
	}
	if (!matchingHeritage) {
		return HERITAGE_ERR;
	}
	
	return 1;
}

function getObjectForName(name) {
	object = new file(false, false, "Object", null, null);
	animal =  new file(false, true, "Animal", object, null);
	trainable = new file(false, true, "Trainable", null, null);
	cat = new file(false, false, "Cat", animal, null);
	corgi = new file(false, false, "Corgi", animal, trainable);
	pizza = new file(false, false, "Pizza", object, null);

	name = name.toLowerCase();

	if (name == "object") {
		return object;
	} else if (name == "animal") {
		return animal;
	} else if (name == "trainable") {
		return trainable;
	} else if (name == "cat") {
		return cat;
	} else if (name == "corgi") {
		return corgi;
	} else if (name == "pizza") {
		return pizza;
	}
	
	return object;
}

function checkCompiles(static, dynamic) {
	console.log("Asked to compare "+static+" and "+dynamic);

	static = getObjectForName(static);
	dynamic = getObjectForName(dynamic);
	
	return checkPolymorphism(static, dynamic);
}