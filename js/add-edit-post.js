import postApi from './api/postApi'
import { initPostForm } from './utils'
;(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')

    const defaultValues = Boolean(postId)
      ? await postApi.getById(postId)
      : {
          title: '',
          description: '',
          author: '',
          imageUrl: '',
        }

    console.log('id', postId)
    console.log('mode', postId ? 'edit' : 'add')
    console.log('defaultValues', defaultValues)

    initPostForm({
      formId: 'postForm',
      defaultValues,
      onsubmit: (formValues) => console.log('submit', formValues),
    })
  } catch (error) {
    console.log('failed to fetch post details', error)
  }
})()
