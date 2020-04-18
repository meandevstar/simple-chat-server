const { Message } = require('../../database')

const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find()
      .populate({
        path: 'sender',
        select: 'name status'
      })
      .lean()
    res.status(200).send(messages)
  } catch (err) {
    next(err)
  }
}


module.exports = {
  getMessages
}