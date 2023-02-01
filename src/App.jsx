import {useState, useMemo} from 'react'
import Clicker from './Clicker.jsx'
import People from './People.jsx'

export default function App({clickersCount, children})
{
    console.log(clickersCount, children)

    const [hasClicker, setHasClicker] = useState(true)
    const [count, setCount] = useState(0)

    const buttonClickedHandler = () =>
    {
        setHasClicker(value => value = !value)
    }

    // this function will be sent to the clickers
    const increment = () =>
    {
        setCount(value => value + 1)
    }

    const tempArray = [...Array(clickersCount)] // Creates an array with clickersCount undefined items, ... = spread operator

    const colors = useMemo( // Acts like a cache
        () =>
        {
            const colors = []

            for(let i = 0; i < clickersCount; i++)
            {
                colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`)
            }

            return colors
        },
        [
            // dependancy array, if nothing is provided the calculation of colors will just happen once
            clickersCount // provide a new color array if clickersCount change
        ]
    )

    /* keyName="countA" is a prop */
    /* key is for react to optimize the render */

    return <>
        {children}
        <div>Total count : {count}</div>
        <button id="button" onClick={buttonClickedHandler}>{hasClicker ? 'Hide' : 'Show'} Clicker</button>
        {
            hasClicker && 
                <>
                    {
                        tempArray.map(
                            (value, index) =>
                            {
                                return <Clicker
                                    key={index}
                                    increment={increment}
                                    keyName={`count${index}`}
                                    color={colors[index]}
                                />
                            }
                        )
                    }
                    {/*
                        <Clicker increment={increment} keyName="countA" color={`hsl(${Math.random() * 360}deg, 100%, 70%)`}/>
                        <Clicker increment={increment} keyName="countB" color="#ff00ff"/>
                        <Clicker increment={increment} keyName="countC" />
                    */}
                </>
        }
        <People></People>
    </>
}