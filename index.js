const os = require("child_process")
os.exec("node -v", function( e1,stdout,e2){console.log(stdout);});
return

const http = require(`http`);
const api = require('./Back/api.js')


function recivePOST(req, res){
    var body = '';

    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)//kill 1MB body
            request.connection.destroy();
    });
    
    req.on('end', function () {
        console.log(body)
        api.api(res,JSON.parse(body))
    });
}

async function reqToRes(req,res){
    switch(req.method){
        case 'GET': res.writeHead(302, {'Location': "https://dashboard.render.com/web/srv-cfsgl49gp3jt6tkt0af0/logs"}); res.end(); break
        case 'POST': recivePOST(req,res); break
        default: res.writeHead(404); res.end(); break
    }
}

const server = http.createServer(reqToRes)//crea il server con le opzioni date
server.listen(5500)//mette il server in ascolto sulla porta 5500