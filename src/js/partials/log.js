const log =
  "window.console.log = (function() {\n" +
  '\tvar escaped = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\\"": "&quot;", "\'": "&#39", "/": "&#x2F;"};\n' +
  "\tvar escapeHTML = function(str) {\n" +
  "\t\treturn String(str).replace(/[&<>\"']/g, function (s) {\n" +
  "\t\t\t\treturn escaped[s];\n" +
  "\t\t});\n" +
  "\t};" +
  "\tvar log = console.log;\n" +
  "\treturn function() {\n" +
  "\t\tlog.apply(window.console, arguments);\n" +
  "\t\tdocument.body.innerHTML +=\n" +
  '\t\t\t"<div>" + \n' +
  '\t\t\t\tescapeHTML(Array.prototype.slice.call(arguments).join(" ")) + \n' +
  '\t\t\t"</div>";\n' +
  "\t};\n" +
  "})();\n\n" +
  "window.console.error = (function() {\n" +
  "\tvar err = console.error;\n" +
  "\treturn function() {\n" +
  "\t\terr.apply(window.console, arguments);\n" +
  "\t\tdocument.body.innerHTML +=\n" +
  '\t\t\t"<div>" + \n' +
  '\t\t\t\tArray.prototype.slice.call(arguments).join(" ") + \n' +
  '\t\t"</div>";\n' +
  "\t};\n" +
  "})();\n\n";

module.exports = log;
