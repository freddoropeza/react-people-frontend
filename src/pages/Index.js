import { useState } from "react";
import { Link } from "react-router-dom"

function Index(props) {
  // state to hold formData
  const [ newForm, setNewForm ] = useState(getNewState);

  // loaded function
  const loaded = () => {
    return props.people.map((person) => (
        <div key={person._id} className="person">
        <Link to={`/people/${person._id}`}><h1>{person.name}</h1></Link>
        <img style={{height: 400, borderRadius: '50%'}} src={person.image} alt={person.name} />
        <h3>{person.title}</h3>
    </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  // handleChange function for form
  const handleChange = (event) => {
    //   using the callback pattern to take snapshot of previous state
    // and merge it into new state
    setNewForm(prevState => ({ ...prevState, [event.target.name]: event.target.value })); //computer property name syntax
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createPeople(newForm);
    setNewForm(getNewState);
  };

  function getNewState() {
      return {
        name: "",
        image: "",
        title: "",
      }
  }

  return (
    <section>
      <form className="Form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="url"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Create Person" />
      </form>
      {props.people ? loaded() : loading()}
    </section>
  );
}

export default Index;