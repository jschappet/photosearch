const async = require('async')

function delay() {
	return new Promise(resolve => setTimeout(resolve, 300));
}

async function delayedLog(item) {
	await delay();
	console.log(item);
}


// create a queue object with concurrency 2
var q = async.queue(async function(number, callback) {
    await delayedLog(number)
    //console.log('hello ' + number);
    callback();
}, 5);

// assign a callback
q.drain = function() {
    console.log('all items have been processed');
};

async function processArray(inArray) {
	q.push(inArray, function(err) {
    	console.log('finished processing foo');
	});
}



processArray([1,2,3,4,5,6,7,8,9,
	10,11,12,13,14,15,16,17,18,19,
	20,21,22,23,24,25,26,27,28,29,
	30,31,32,33,34,35,36,37,38,39,
	40,41,42,43,44,45,46,47,48,49,50])