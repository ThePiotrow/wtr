import axios from 'axios'
import { parse, stringify } from 'qs'
import { AnyObject } from '../utils/type'

const API_CONFIG: any = {
  returnRejectedPromiseOnError: true,
  timeout: 60000,
  baseURL: 'http://localhost:3000',
  // paramsSerializer: {
  //   encode: parse,
  //   serialize: stringify,
  // },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
}

const api = axios.create(API_CONFIG)

export const register = (data: AnyObject) => {
  return api
    .post('/auth/register', data)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
}

export const fetchAll = (route: string) => {
  return api
    .get(`/api/${route}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export const fetchById = (route: string, id: number) => {
  return api
    .get(`/api/${route}/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export const create = (route: string, data: AnyObject) => {
  return api
    .post(`/api/${route}`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export const update = (route: string, data: AnyObject) => {
  const { id, ...obj } = data
  return api
    .put(`/api/${route}/${id}`, obj)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export const deleteItem = (route: string, id: number) => {
  return api
    .delete(`/api/${route}/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}
