export function setTextContent(parent, selector, text) {
  if (!parent) return
  const element = parent.querySelector(selector)
  if (element) element.textContent = text
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1)}...`
}

export function setFieldValue(form, selector, value) {
  if (!form) return
  debugger
  const field = form.querySelector(selector)
  if (field) field.value = value
}

export function setBackgroundImage(parent, selector, imageUrl) {
  if (!parent) return
  const element = parent.querySelector(selector)
  if (element) element.style.backgroundImage = `url("${imageUrl}")`
}
