import dayjs from 'dayjs'
import postApi from './api/postApi'
import { setTextContent, truncateText } from './utils/common'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

function createPostElement(post) {
  if (!post) return
  //find template and clone
  const postTemplate = document.getElementById('postTemplate')
  if (!postTemplate) return
  const liElement = postTemplate.content.firstElementChild.cloneNode(true)
  if (!liElement) return

  setTextContent(liElement, '[data-id="title"]', post.title)
  setTextContent(liElement, '[data-id="author"]', post.author)
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100))
  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]')
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl
    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=thubnail'
    })
  }

  console.log('day format')
  setTextContent(liElement, '[data-id="timeSpan"]', ` - ${dayjs(post.updateAt).fromNow()}`)
  return liElement
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

function renderPagination(pagination) {
  const ulPagination = document.getElementById('pagination')
  if (!pagination || !ulPagination) return

  //calc totalPages
  const { _page, _limit, _totalRows } = pagination
  const totalPages = Math.ceil(_totalRows / _limit)

  //save page and totalPages to ulPagination
  ulPagination.dataset.page = _page
  ulPagination.dataset.totalPages = totalPages

  //check if enable/disable prev/next links
  if (_page <= 1) {
    ulPagination.firstElementChild?.classList.add('disabled')
  } else ulPagination.firstElementChild?.classList.remove('disabled')

  if (_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled')
  else ulPagination.lastElementChild?.classList.remove('disabled')
}

function handlePrevClick(e) {
  e.preventDefault()
  console.log('prev click')
}
function handleNextClick(e) {
  e.preventDefault()
  console.log('next click')
}

function initPagination() {
  const ulPagination = document.getElementById('pagination')
  if (!ulPagination) return
  //bind click event for next/prev link

  // add click event for prev link
  const prevLink = ulPagination.firstElementChild?.firstElementChild
  if (prevLink) {
    prevLink.addEventListener('click', handlePrevClick)
  }

  // add click event for next link
  const nextLink = ulPagination.lastElementChild?.lastElementChild
  if (nextLink) {
    nextLink.addEventListener('click', handleNextClick)
  }

  // console.log('abc', { prevLink, nextLink })
}

function initURL() {
  const url = new URL(window.location)
  // console.log('url', url.search)
  //update search params of needed
  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)
  history.pushState({}, '', url)
}

;(async () => {
  try {
    initPagination()
    initURL()

    // const queryParams = {
    //   _page: 1,
    //   _limit: 6,
    // }

    const queryParams = new URLSearchParams(window.location.search)
    console.log('queryParams', queryParams.toString())

    const { data, pagination } = await postApi.getAll(queryParams)
    console.log('data', data)
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    console.log('response error', error)
  }
})()
