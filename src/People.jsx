import {useState, useEffect} from 'react'

export default function People()
{
    /*
    const [people, setPeople] = useState(
        [
            {id: 1, name: 'Toto'},
            {id: 2, name: 'Prout'},
            {id: 3, name: 'Machin'},
            {id: 4, name: 'Bidule'}
        ]
    )
    */

    const getPeople = () =>
    {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(
                (response) =>
                {
                    return response.json()
                }
            )
            .then(
                (result) =>
                {
                    setPeople(value => value = result)
                }
            )
            .catch(
                (exception) =>
                {
                    console.error(exception)
                }
            )
    }

    useEffect(
        () =>
        {

            getPeople()
        },
        []
    )

    return <>
        <h2>People</h2>
        <ul>
            {
                people.map(
                    (person) =>
                    {
                        return <li key={person.id}>{person.name}</li>
                    }
                )
            }
        </ul>
    </>
}