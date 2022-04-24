const Person = ({ person, handleDeleteClick }) => (
  <div>
    {person.name} {person.number}
    <button onClick={() => handleDeleteClick(person)}>
      delete
    </button>
  </div>
)

const Persons = ({ persons, handleDeleteClick }) => (
  <>
    {persons.map(person => (
      <Person 
        key={person.name}
        person={person}
        handleDeleteClick={handleDeleteClick} />
    ))}
  </>
)

export default Persons