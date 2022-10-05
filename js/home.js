import dayjs from 'dayjs'
import postApi from './api/postApi'
import { setTextContent, truncateText } from './utils/common'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getUlPagiantion } from './utils'
import debounce from 'lodash.debounce'

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

  setTextContent(liElement, '[data-id="timeSpan"]', ` - ${dayjs(post.updateAt).fromNow()}`)
  return liElement
}

function renderPostList(postList) {
  if (!Array.isArray(postList)) return
  const ulElement = document.getElementById('postsList')
  if (!ulElement) return

  //clear current list
  ulElement.textContent = ''
  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulElement.appendChild(liElement)
  })
}

function renderPagination(pagination) {
  const ulPagination = getUlPagiantion()
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

async function handleFilterChange(filterName, filterValue) {
  try {
    //update query params
    const url = new URL(window.location)
    url.searchParams.set(filterName, filterValue)
    //reset page
    if (filterName === 'title_like') url.searchParams.set('_page', 1)

    history.pushState({}, '', url)

    const { data, pagination } = await postApi.getAll(url.searchParams)
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    console.log('failed to fetch post list', error)
  }
}

function handlePrevClick(e) {
  e.preventDefault()
  const ulPagination = getUlPagiantion()
  if (!ulPagination) return

  const page = Number.parseInt(ulPagination.dataset.page) || 1
  if (page <= 1) return

  handleFilterChange('_page', page - 1)
}
function handleNextClick(e) {
  e.preventDefault()
  const ulPagination = getUlPagiantion()
  if (!ulPagination) return
  const page = Number.parseInt(ulPagination.dataset.page) || 99
  const totalPages = ulPagination.dataset.totalPages

  if (page >= totalPages) return

  handleFilterChange('_page', page + 1)
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
}

function initSearch() {
  const searchInput = document.getElementById('searchInput')
  if (!searchInput) return

  const queryParams = new URLSearchParams(window.location.search)

  if (queryParams.get('title_like')) {
    searchInput.value = queryParams.get('title_like')
  }

  const debounceSearch = debounce(
    (event) => handleFilterChange('title_like', event.target.value),
    500
  )
  searchInput.addEventListener('input', debounceSearch)
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
    const queryParams = new URLSearchParams(window.location.search)
    const { data, pagination } = await postApi.getAll(queryParams)
    renderPostList(data)
    renderPagination(pagination)
    initSearch()
  } catch (error) {
    console.log('response error', error)
  }
})()
