const md5File = require('md5-file/promise')
const async = require('async')



var redis = require('redis');
var client = redis.createClient(); // this creates a new client


client.on('connect', function() {
    console.log('Redis client connected');
});

var find = require('find');

var path = '/Volumes/LaCie/Pictures/'
//var path = '/Users/schappetj/Desktop/'

async function checkFile(imageFile) {
	await md5File(imageFile).then(hash => {
		//console.log(hash, imageFile)
		client.get(hash, function (error, result) {
	    	if (error) {
	        	console.log("Error: ", error);
	        	throw error;
	    	}
	    	if (result === null) {
	    		//console.log("Adding File: ", imageFile)
	    		client.set(hash, imageFile)//, redis.print);

	    	} else {
	    		if (result === imageFile) {

	    		} else {
	 	    		console.log('File Exists: ', result, imageFile);
   			
	    		}
	    	}
	    	
		});
	 //client.quit() 
	})
}

// create a queue object with concurrency 2
var q = async.queue(async function(imageFile, callback) {
    await checkFile(imageFile)
    //console.log('hello ' + number);
    callback();
}, 5);


find.eachfile(path, function(imageFile) {
  q.push(imageFile, function(err) {
    	//console.log('finished processing: ', imageFile);
	});
})
	
// assign a callback
q.drain = function() {
	client.quit()
    console.log('all files have been processed');
};
