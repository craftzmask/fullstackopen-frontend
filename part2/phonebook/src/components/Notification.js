const Notification = ({ message, type }) => {
  if (!message) return null

  const color = (type === 'error') ? 'red' : 'green'

  const style = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification