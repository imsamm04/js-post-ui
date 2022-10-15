import postApi from '../api/postApi'
;(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')

    const defautValues = Boolean(postId)
      ? await postApi.getById(postId)
      : {
          title: '',
          description: '',
          author: '',
          imageUrl: '',
        }

    console.log('id', postId)
    console.log('mode', postId ? 'edit' : 'add')
    console.log('defautValues', defautValues)
  } catch (error) {
    console.log('failed to fetch post details', error)
  }
})()
