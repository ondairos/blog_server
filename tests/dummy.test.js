const listHelper = require('../utils/list_helper')

test('test if dummy function returns 1', () => {
    const blogs = ['lalalalal','stroumfotragoudo','llalalal2']
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})