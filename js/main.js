import axios from 'axios'
import axiosClient from './api/axiosClient'
import postApi from './api/postApi'

async function main() {
  //   const response = await axiosClient.get('/posts')

  try {
    const queryParams = {
      _page: 1,
      _limit: 5,
    }
    const response = await postApi.getAll(queryParams)
    console.log('all response', response)
  } catch (error) {}
}

main()
