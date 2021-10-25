import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

const Main = (props) => {
  const [ people, setPeople ] = useState(null);

  // const BASE_URL = "http://localhost:3001/people/";
  const BASE_URL = "https://nameless-depths-03796.herokuapp.com/people";


  const getPeople = async () => {
    // const data = await fetch(BASE_URL).then(response => response.json());
    const response = await fetch(BASE_URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    // make post request to create people
    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  // make sure we get people when the application laods 
  // in toher words, we need a side effect to occus as a result of the page loading. 
  // we will use the useEffect hook to have it's effect funtion run on page load

  // useEffect(() => getPeople()) // why does this syntax create an infinite loop
  useEffect(() => getPeople(), []); //

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPeople={createPeople} />
        </Route>
        <Route
          path="/people/:id"
          render={(rp) => (
            <Show
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;