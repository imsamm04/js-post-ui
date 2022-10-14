import postApi from '../api/postApi'
import { setTextContent } from './common'
import { renderPostList } from './post'
import dayjs from 'dayjs'

function renderPostDetail(post) {
  //render title, description, author, updateAt, img, edit page link

  if (!post) return
  setTextContent(document, '#postDetailTitle', post.title)
  setTextContent(document, '#postDetailDescription', post.description)
  setTextContent(document, '#postDetailAuthor', post.author)
  setTextContent(
    document,
    '#postDetailTimeSpan',
    dayjs(post.updatedAt).format(' - DD/MM/YYYY HH:mm')
  )

  const heroImage = document.getElementById('postHeroImage')
  if (heroImage) {
    heroImage.style.backgroundImage = `url("${post.imageUrl}")`
    heroImage.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=thubnail'
    })
  }

  const editPageLink = document.getElementById('goToEditPageLink')
  if (editPageLink) {
    editPageLink.href = `/add-edit-post.html?id=${post.id}`
    // editPageLink.textContent = 'edit post'
    // editPageLink.innerHTML = '<i class="fas fa-edit"><i/> Edit Post'
  }
}

;(async () => {
  //get post id from URL
  //fetch post detail post
  //render post detail
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')
    if (!postId) {
      //   alert('not found')
      console.log('post not found')
      return
    }

    const post = await postApi.getById(postId)
    renderPostDetail(post)
  } catch (error) {
    console.log('failed to fetch post detail')
  }
})()

// author
// :
// "Kira Schroeder"
// createdAt
// :
// 1662885819124
// description
// :
// "dolorum aliquam id nesciunt aut recusandae molesti…uo quis consequatur quae possimus tenetur tempora"
// id
// :
// "lea2aa9l7x3a5th"
// imageUrl
// :
// "https://picsum.photos/id/214/1368/400"
// title
// :
// "Error amet sit"
// updatedAt
// :
// 1665735604696
