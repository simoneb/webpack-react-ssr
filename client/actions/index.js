export const INCREMENT = () => ({type: 'INCREMENT'})
export const DECREMENT = () => ({type: 'DECREMENT'})

import {get} from 'axios'

export const callApi = () => dispatch => {
  console.log('fetching api/hello')
  return get(`${global.window ? '' : 'http://localhost:3000'}/api/hello`)
      .then(({data}) => {
        console.log('fetched api/hello')
        return dispatch({type: 'API', payload: data})
      })
      .catch(err => console.error(err))
}
