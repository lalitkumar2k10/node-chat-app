const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString',()=>{
    it('should reject non-string values', ()=>{
        var res = isRealString(98);
        expect(res).toBe(false);
    });
    it('should reject only spaces string', ()=>{
        var res = isRealString('      ');
        expect(res).toBe(false);
    });
    it('should allow non-space chars', ()=>{
        var res = isRealString(' Lalit ');
        expect(res).toBe(true);
    });
});