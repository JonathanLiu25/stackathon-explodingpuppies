import {
  CREATE_USER,
  CREATE_USERS,
  UPDATE_USER,
  UPDATE_USERS,
  DELETE_USER
} from './constants'

/* ACTION CREATORS */
const createUser = user => ({
  type: CREATE_USER,
  user
})

const createUsers = users => ({
  type: CREATE_USERS,
  users
})

const updateUser = user => ({
  type: UPDATE_USER,
  user
})

const updateUsers = users => ({
  type: UPDATE_USERS,
  users
})

const deleteUser = user => ({
  type: DELETE_USER,
  user
})

/* DISPATCHERS */
export const addUser = user =>
  dispatch =>
    dispatch(createUser(user))

export const addUsers = users =>
  dispatch =>
    dispatch(createUsers(users))

export const changeUser = user =>
  dispatch =>
    dispatch(updateUser(user))

export const changeUsers = users =>
  dispatch =>
    dispatch(updateUsers(users))

export const removeUser = user =>
  dispatch =>
    dispatch(deleteUser(user))
