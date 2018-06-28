const mocha=require('mocha');
const expect=require('expect');
const {generateMessage}=require('./message');
describe('generateMessage',()=>{
	it('should retuen from and text object with date',()=>{
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