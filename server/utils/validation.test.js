const expect = require('expect')
const {isRealString} = require('./validation')

describe('isRealString',()=>{
  it('should reject non-string values',()=>{
    var res= isRealString(98)
    console.log(res)
    expect(res).toBe(false)
  })

  it('should reject string with only spaces',()=>{
    var res= isRealString('  ')
    console.log(res)
    expect(res).toBe(false)
  })

  it('should allow strings with spaces between them',()=>{
    var res= isRealString(' Agnel Joseph  ')
    console.log(res)
    expect(res).toBe(true)
  })
})