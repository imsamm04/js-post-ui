import { setBackgroundImage, setFieldValue } from './common'

function setFormValues(form, formValues) {
  debugger
  setFieldValue(form, '[name="title"]', formValues?.title)
  setFieldValue(form, '[name="author"]', formValues?.author)
  setFieldValue(form, '[name="description"]', formValues?.description)
  setBackgroundImage(document, '#postHeroImage', formValues?.imageUrl)
}

export function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId)
  if (!form) return
  setFormValues(form, defaultValues)

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    //get form value

    //validation

    //submit if valid value
  })
}
