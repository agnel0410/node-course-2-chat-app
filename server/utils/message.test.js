const expect = require("expect")

const {generateMessage} = require("./message")

describe('generateMessage',()=>{
  it('should generate correct message object',()=>{
    const from = 'Agnel'
    const text= 'Hi, how are you?'
    const res = generateMessage(from,text)
    expect(res.createdAt).toBeA('number')
    expect(res).toInclude({from,text}).toBeA('object')
  })
})

