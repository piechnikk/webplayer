var http = require("http");
var fs = require("fs");
var formidable = require("formidable")
const db = require(__dirname + "/database.js")

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            console.log(decodeURIComponent(req.url));
            let url = "";
            if (req.url == "/admin")
                url = "static/index.html";
            else
                url = "static" + decodeURIComponent(req.url);

            if (req.url.split(".").reverse()[0] == "jpg") {
                console.log(url);
                fs.readFile(url, function (error, data) {
                    if (error) {
                        fs.readFile("static/default.jpg", function (error, data) {
                            res.writeHead(200, { "content-type": "*/*;charset=utf-8" });
                            res.write(data);
                            res.end();
                        });
                    } else {
                        res.writeHead(200, { "content-type": "*/*;charset=utf-8" });
                        res.write(data);
                        res.end();
                    };
                });
            } else if (req.url.split(".").reverse()[0] != "mp3") {
                console.log(url);
                fs.readFile(url, function (error, data) {
                    if (error) {
                        res.writeHead(404, { "content-type": "text/html;charset=utf-8" });
                        res.write("<h1>404 - brak strony</h1>");
                        res.end();
                    } else {
                        res.writeHead(200, { "content-type": "*/*;charset=utf-8" });
                        res.write(data);
                        res.end();
                    };
                });
            } else {
                fs.readFile(url, function (error, data) {
                    if (error) {
                        res.writeHead(404, { "content-type": "text/html;charset=utf-8" });
                        res.write("<h1>404 - brak strony</h1>");
                        res.end();
                    } else {
                        console.log(fs.statSync(__dirname + "/static" + decodeURIComponent(req.url)).size);
                        res.writeHead(200, {
                            "Content-Type": "audio/mpeg",
                            "Content-Length": fs.statSync(__dirname + "/static" + decodeURIComponent(req.url)).size,
                            "Accept-Ranges": "bytes"
                        });
                        res.write(data);
                        res.end();
                    };
                });
            }
            break;
        case "POST":
            if (req.url == "/files") {
                var allData = "";
                req.on("data", function (data) {
                    allData += data;
                })
                req.on("end", function (data) {
                    var jsonObj = JSON.parse(allData); // parsowanie odebranych danych na json-a
                    var obj = { dirs: [], files: [], actual: "" }
                    fs.readdir(__dirname + "/static/mp3/", function (err, files) {

                        if (err) {
                            return console.log(err);
                        }
                        // tu można operować na zczytanych nazwach plików / katalogów
                        files.forEach(function (fileName) {
                            obj.dirs.push(fileName)
                        });


                        var name = "/static/mp3/" + files[0] + "/"
                        obj.actual = files[0]
                        if (jsonObj.info == "next") {
                            name = "/static/mp3/" + jsonObj.file + "/"
                            obj.actual = jsonObj.file
                        }
                        fs.readdir(__dirname + "/static/mp3/" + obj.actual, function (err, files) {
                            if (err) {
                                return console.log(err);
                            }
                            let x = 0
                            files.forEach(function (fileName) {
                                if (fileName.split(".").reverse()[0] == "mp3") {
                                    var stats = fs.statSync(__dirname + name + fileName);
                                    obj.files.push({ id: x, file: fileName, size: Math.round(stats.size / 1024 / 1024 * 100) / 100 + "MB" })
                                    x++
                                }
                            });

                            res.writeHead(200, { 'content-type': 'application/json;charset=utf-8', "Access-Control-Allow-Origin": "*" }); // nagłówek
                            res.end(JSON.stringify(obj, null, 4));
                        });
                    });
                })
            } else if (req.url == "/add") {
                var allData = "";
                req.on("data", function (data) {
                    allData += data;
                })
                req.on("end", function (data) {
                    var jsonObj = JSON.parse(allData); // parsowanie odebranych danych na json-a
                    db.add(jsonObj)
                    res.writeHead(200, { 'content-type': 'application/json;charset=utf-8', "Access-Control-Allow-Origin": "*" }); // nagłówek
                    res.end(JSON.stringify(jsonObj, null, 4));
                })
            } else if (req.url == "/getPlaylist") {
                var allData = "";
                req.on("data", function (data) {
                    allData += data;
                })
                req.on("end", function (data) {
                    var jsonObj = JSON.parse(allData); // parsowanie odebranych danych na json-a
                    db.get().then((val) => {
                        res.writeHead(200, { 'content-type': 'application/json;charset=utf-8', "Access-Control-Allow-Origin": "*" }); // nagłówek
                        res.end(JSON.stringify(val));
                    })
                })
            } else if (req.url == "/upload") {
                let form = formidable({})

                // tworzenie folderu
                var dir = "static/mp3/" + new Date().getTime() + "/";

                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }

                form.uploadDir = dir  // katalog na zuploadowane pliki
                form.keepExtensions = true   // zapis z rozszerzeniem pliku
                form.multiples = true

                form.parse(req, function (err, fields, files) {
                    console.log(files) // tu są zawarte wszystkie potrzebne dane
                    for (let i = 0; i < files.file.length; i++) {
                        fs.rename(files.file[i].path, dir + files.file[i].name, function (err) {
                            if (err) console.log(err)
                            console.log("rename ok")
                            console.log(files.file[i].name.split(".").reverse()[0]);
                            if (files.file[i].name.split(".").reverse()[0] == "jpg") {
                                fs.rename(dir + files.file[i].name, dir + "cover.jpg", function (err) {
                                    if (err) console.log(err)
                                    console.log("rename cover ok")
                                });
                            }
                        });
                    }
                    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                    res.end("plik zapisany");
                });
            }
            break;
    };
});

server.listen(3000, function () {
    console.log("start na porcie 3000");
});