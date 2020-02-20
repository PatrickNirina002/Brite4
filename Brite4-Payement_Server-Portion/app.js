var http = require('http');
var fs = require('fs');
const PORT = 3001;

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {     
    console.log('Client connected.');

    socket.on('message', function(data) {
    	console.log("A message is sent", data);    
    });

    socket.on('amount', function(amount) {
    	console.log("amount to have: ", amount);
        //sent paiement approved
        setTimeout(function(){  
            console.info(" Emit 'payementApproved'");
            socket.emit('paymentApproved');
            //socket.emit('TransactionTimeOut');
            //socket.emit('paymentFailed');
            setTimeout(function(){
                console.info(" Emit 'wait'");
                socket.emit('wait');
                //socket.emit('TransactionTimeOut');
                //socket.emit('paymentFailed');
                setTimeout(function(){
                    console.info(" Emit 'thankYou'");
                    socket.emit('thankYou');
                    //socket.emit('TransactionTimeOut');
                    //socket.emit('paymentFailed');
                }, 5000);
            }, 5000);
        }, 5000);
    });
    socket.on('buy', function(data) {
        console.log("Receive 'buy' with : ", data);
        //sent paiement approved
        setTimeout(function(){  
            console.info(" Emit 'payementApproved'");
            socket.emit('paymentApproved');
            //socket.emit('TransactionTimeOut');
            //socket.emit('paymentFailed');
            //socket.emit('switch2tech');
            /*setTimeout(function(){
                //console.info(" Emit 'wait'");
                //socket.emit('wait');
                //console.info(" Emit 'soldOut'");
                //socket.emit('soldOut');
                //socket.emit('TransactionTimeOut');
                //socket.emit('paymentFailed');
                setTimeout(function(){
                    //console.info(" Emit 'thankYou'");
                    //socket.emit('thankYou');
                    //socket.emit('TransactionTimeOut');
                    //socket.emit('paymentFailed');
                }, 5000);
            }, 5000);*/
        }, 5000);
    });

    socket.on("next", function(current_product_position){
        console.log(" Current product position : ", current_product_position);
        setTimeout(function(){
            console.info(" Emit 'wait'");
            socket.emit('wait');
            setTimeout(function(){
                //console.info(" Emit 'thankYou'");
                //socket.emit('thankYou');
                console.info(" Emit 'paymentFailed'");
                socket.emit('paymentFailed', 4);
            }, 5000);
            //socket.emit('switch2tech');
        }, 5000);
    });

    socket.on("getProduct", (product_name) => {
        console.log("Get first roduct : ", product_name);
        //socket.emit('TransactionTimeOut');
        //socket.emit('paymentFailed');
        //socket.emit('switch2tech');
        setTimeout(function(){
            //console.info(" Emit 'wait'");
            //socket.emit('wait');
            //socket.emit('TransactionTimeOut');
            //socket.emit('paymentFailed', 4);
            //console.info(" Emit 'soldOut'");
            //socket.emit('soldOut');
            console.info(" Emit 'thankYou'");
            socket.emit('thankYou');
            setTimeout(function(){
                //console.info(" Emit 'thankYou'");
                //socket.emit('thankYou');
                //socket.emit('TransactionTimeOut');
                //socket.emit('paymentFailed');
            }, 5000);
        }, 5000);
    });

    socket.on("getThankYou", () => {
        //console.info(" Emit 'thankYou'");
        //socket.emit('thankYou');
        console.info(" Emit 'paymentFailed'");
        socket.emit('paymentFailed', 4);
        //console.info(" Emit 'soldOut'");
        //socket.emit('soldOut');
    });

    socket.on('paymentpage', function(data) {
        console.log("Open the freezer");
        setTimeout(function() {
            socket.emit('doorClosed');
        }, 10000);
    });

    socket.on('cancelTransaction', function() {
	   console.log("transaction canceled")
    });

    /*setTimeout(function(){
        console.log("Emitting the 'switch2tech'");
            //socket.emit('paymentApproved');
            //socket.emit('TransactionTimeOut');
            //socket.emit('paymentFailed');
            socket.emit('switch2tech');
    }, 10000);*/

});


server.listen(PORT, ()=>{ console.log('Listening on Port '+ PORT); });