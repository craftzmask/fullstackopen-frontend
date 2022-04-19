const Filter = ({ query, handleQueryChange }) => (
  <div>
    filter shown with
    <input 
      value={query}
      onChange={handleQueryChange}
    />
  </div>
)

export default Filter