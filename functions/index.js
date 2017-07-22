const functions = require('firebase-functions');
const encoder = require("plantuml-encoder");
const support = {
  server: {
    "default": "http://plantuml.com/plantuml",
    "plantuml": "http://plantuml.com/plantuml"
  },
  format: {
    "img": "img",
    "uml": "uml",
    "png": "png",
    "svg": "svg",
    "default": "png"
  },
  output: {
    "redirect": "redirect",
    "html": "html",
    "encoded": "encoded",
    "default": "encoded",
  }
};
var checkedGet = (obj, key, defaultKey) => {
  return (key && obj[key]) ? obj[key] : obj[defaultKey];
};

exports.plantuml_encoder = functions.https.onRequest((req, res) => {
  console.log(req);
  var param = req.body;
  var data = encoder.encode(param.data);
  var server = checkedGet(support.server, param.server, "default");
  var format = checkedGet(support.format, param.format, "default");
  var output = checkedGet(support.output, param.output, "default");

  var url = server + "/" + format + "/" + data;
  console.log({ data: data, server: server, format: format, output: output, url: url });
  switch (output) {
    case "redirect":
      console.log("redirect");
      res.redirect(url);
      break;

    case "html":
      console.log("html");
      res.send("<img src=\"" + url + "\" />");
      break;

    case "encoded":
      console.log("encoded");
    default:
      console.log("default");
      res.send(data);
  }
});
