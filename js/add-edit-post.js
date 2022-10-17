import postApi from './api/postApi'
import { initPostForm, toast } from './utils'

async function handlePostFormSubmit(formValues) {
  try {
    // throw new Error('Error from testing')
    // let savedPost = null
    // //check add/edit mode
    // if (formValues.id) {
    //   savedPost = await postApi.update(formValues)
    // } else {
    //   savedPost = await postApi.add(formValues)
    // }

    const savedPost = formValues.id
      ? await postApi.update(formValues)
      : await postApi.add(formValues)
    //call api

    //show succes message
    toast.success('Save post successfully')

    //redirect to detail page
    setTimeout(() => {
      window.location.assign(`/post-detail.html?id=${savedPost.id}`)
    }, 1000)

    console.log('redirect to', savedPost.id)
  } catch (error) {
    toast.error(`Failed to save post ${error.message}`)
  }
}
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

    initPostForm({
      formId: 'postForm',
      defaultValues,
      onSubmit: handlePostFormSubmit,
    })
  } catch (error) {
    console.log('failed to fetch post details:', error)
  }
})()
