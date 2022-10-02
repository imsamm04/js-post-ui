import postApi from './api/postApi'
import { setTextContent } from './utils'

function createPostElement(post) {
  if (!post) return
  try {
    //find template and clone
    const postTemplate = document.getElementById('postTemplate')
    if (!postTemplate) return
    const liElement = postTemplate.content.firstElementChild.cloneNode(true)
    if (!liElement) return

    setTextContent(liElement, '[data-id="title"]', post.title)
    setTextContent(liElement, '[data-id="author"]', post.author)
    setTextContent(liElement, '[data-id="description"]', post.description)
    const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]')
    if (thumbnailElement) thumbnailElement.src = post.imageUrl

    return liElement
  } catch (error) {
    console.log('failed to create post item', error)
  }
}

function renderPostList(postList) {
  console.log('postList', postList)
  if (!Array.isArray(postList) || postList.length === 0) return

  const ulElement = document.getElementById('postsList')
  if (!ulElement) return

  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulElement.appendChild(liElement)
  })
}

;(async () => {
  try {
    const queryParams = {
      _page: 1,
      _limit: 6,
    }
    const { data, pagination } = await postApi.getAll(queryParams)
    console.log('data', data)
    renderPostList(data)
  } catch (error) {
    console.log('response error', error)
  }
})()
