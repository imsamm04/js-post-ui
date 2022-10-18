import postApi from './api/postApi'
import { initSearch, initPagination, renderPagination, renderPostList, toast } from './utils'

async function handleFilterChange(filterName, filterValue) {
  try {
    //update query params
    const url = new URL(window.location)
    if (filterName) url.searchParams.set(filterName, filterValue)

    //reset page
    if (filterName === 'title_like') url.searchParams.set('_page', 1)

    history.pushState({}, '', url)

    const { data, pagination } = await postApi.getAll(url.searchParams)
    renderPostList('postsList', data)
    renderPagination('pagination', pagination)
  } catch (error) {
    console.log('failed to fetch post list', error)
  }
}

function RegisterPostDeleteEvent() {
  document.addEventListener('post-delete', async (event) => {
    console.log('remove post - click', event.detail)
    //call api to remove post by id
    try {
      const post = event.detail
      const message = `Are you sure to remove this post "${post.title}"?`
      if (window.confirm(message)) {
        await postApi.remove(post.id)
        await handleFilterChange()
        toast.success('Remove post suceessfully')
      }
    } catch (error) {
      toast.error(error.message)
    }
    //refesh data
  })
}

;(async () => {
  try {
    const url = new URL(window.location)
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)

    history.pushState({}, '', url)
    const queryParams = url.searchParams

    initPagination({
      elementId: 'pagination',
      defaultParams: queryParams,
      onChange: (page) => handleFilterChange('_page', page),
    })
    RegisterPostDeleteEvent()
    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('title_like', value),
    })
    handleFilterChange()
  } catch (error) {
    console.log('response error', error)
  }
})()
