const { CREATED, BAD_REQUEST } = require('http-status-codes')

const { isValid } = require('../utils/validate')

const logger = require('../utils/logger')
const { user } = require('../models')
const dbQueries = require('../utils/dbQueries')
const userController = module.exports
const log = logger.getLogger('userController')

userController.contarUsers = async (req, res) => {

  let where = req.query
  if (Object.keys(where).length === 0) {
    where = {}
  }
  log.info(`listUsers ${JSON.stringify(where)} `)
  const user = (await dbQueries.select('user', where)).length
  res.json(user)
}

userController.listUsers = async (req, res) => {

  let where = req.query
  if (Object.keys(where).length === 0) {
    where = {}
  }
  log.info(`listUsers ${JSON.stringify(where)} `)
  const user = await dbQueries.select('user', where)
  res.json(user)
}

userController.createUser = async (req, res) => {
  const { body } = req;
  log.info(`createUser body=${JSON.stringify(body)} `);
  const errors = isValid(body, user.usersSchema);
  if (errors.length) {
    log.error(`createUser invalid body `);
    res.status(BAD_REQUEST).json({ error: errors });
  } else {
    const newItem = await dbQueries.insert('user', body);
    log.info(`user created with id=${newItem[0].id}`);
    res.status(201).json(newItem);
  }
}

userController.deleteUser = async (req, res) => {
  const { id } = req.query
  log.info(`deleteUser id=${id} `)
  const del = await dbQueries.delete('user', id)
  res.json(del)
}

userController.updateUser = async (req, res) => {
  const { body } = req
  const { id } = req.query
  log.info(`updateUser id=${id} body=${JSON.stringify(body)}`)

  const errors = isValid(body, user.usersSchemaUpdate)
  if (errors.length) {
    log.error(`updateUser invalid body `)
    res.status(400).json({ error: errors })
  }

  const upd = await dbQueries.update('user', id, body)
  res.json(upd)
}