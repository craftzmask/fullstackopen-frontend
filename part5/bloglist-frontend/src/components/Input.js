const Input = props => {
  return (
    <div>
      {props.label}:
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export default Input