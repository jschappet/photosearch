const md5File = require('md5-file/promise')
 


var redis = require('redis');
var client = redis.createClient(); // this creates a new client


client.on('connect', function() {
    console.log('Redis client connected');
});


var imageFile = '/Volumes/LaCie/Pictures/IMG_0033.JPG'

md5File(imageFile).then(hash => {
	console.log(hash)
	client.get(hash, function (error, result) {
    	if (error) {
        	console.log("Error: ", error);
        	throw error;
    	}
    	if (result === null) {
    		client.set(hash, imageFile, redis.print);

    	}
    	console.log('GET result -> ' + result);
	});
 //client.quit() 
})


client.keys("*", function (error, result) {
	console.log(result)
})

//client.quit() 