import axios from 'axios'
import axiosClient from './api/axiosClient'
import postApi from './api/postApi'

async function main() {
  debugger
  //   const response = await axiosClient.get('/posts')
  const queryParams = {
    _page: 1,
    _limit: 5,
  }
  const response = await postApi.getAll(queryParams)
  console.log(response)
}

main()
