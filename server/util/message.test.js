const mocha=require('mocha');
const expect=require('expect');
const {generateMessage,generateLocationMessage}=require('./message');
describe('generateMessage',()=>{
	it('should return from and text object with date',()=>{
		var from='jen';
		var text='something';
		var result=generateMessage(from,text);
		expect(result.createdAt).toBeA('number');
		expect(result).toInclude({
			from,
			text
		});
	});

});


describe('generateLocationMessage',()=>{
	it('should get current location',()=>{
		var from='Deb';
		var latitude=15;
		var longitude=19;
		var url=`https://www.google.com/maps?q=15,19`;
		var message=generateLocationMessage(from,latitude,longitude);
		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from,
			url
		});

	})
});