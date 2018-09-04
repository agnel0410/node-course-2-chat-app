const expect = require("expect")

const { generateMessage, generateLocationMessage} = require("./message")

describe('generateMessage',()=>{
  it('should generate correct message object',()=>{
    const from = 'Agnel'
    const text= 'Hi, how are you?'
    const res = generateMessage(from,text)
    expect(res.createdAt).toBeA('number')
    expect(res).toInclude({from,text}).toBeA('object')
  })
})

describe('generateLocationMessage',()=>{
  it('should generate location message object',()=>{
    const res = generateLocationMessage('Agnel', 29.758070300000004, -95.6423394)
    expect(res.createdAt).toBeA('number')
    expect(res).toInclude({
      from: 'Agnel',
      url:`https://google.com/maps?q=29.758070300000004,-95.6423394`
    }).toBeA('object')
  })
})

