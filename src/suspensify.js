export default function suspensify(promise) {
  let status = "pending"
  let result
  const suspender = promise
    .then(resolve => {
      status = "success"
      result = resolve
    })
    .catch(error => {
      status = "error"
      result = error
    })

  return {
    read() {
      if (status === "pending") throw suspender
      if (status === "error") throw result
      if (status === "success") return result
    }
  }
}
