import { setBackgroundImage, setFieldValue } from './common'

function getFormValues(form) {
  const formValues = {}
  // ;['title', 'author', 'description', 'imageUrl'].forEach((name) => {
  //   const field = form.querySelector(`[name="${name}"]`)
  //   if (field) values[name] = field.value
  // })

  const data = new FormData(form)
  for (const [key, value] of data) {
    formValues[key] = value
  }

  return formValues
}

function setFormValues(form, formValues) {
  setFieldValue(form, '[name="title"]', formValues?.title)
  setFieldValue(form, '[name="author"]', formValues?.author)
  setFieldValue(form, '[name="description"]', formValues?.description)

  setFieldValue(form, '[name="imageUrl"]', formValues?.imageUrl) // hidden field
  setBackgroundImage(document, '#postHeroImage', formValues?.imageUrl)
}

export function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId)
  if (!form) return
  setFormValues(form, defaultValues)

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('submit form')
    //get form value
    const formValues = getFormValues(form)
    console.log('formValues', formValues)
    //validation

    //submit if valid value
  })
}
