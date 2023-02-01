import {useState, useEffect, useRef} from 'react'

//const Clicker = (props) =>
const Clicker = ({increment, keyName, color = 'red'}) => // using default values for props
{
    //console.log(props)

    //const {keyName, color} = props

    //console.log('Destructuring object', keyName, color)

    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0)) // is an array, ?? = nullish coalescing operator that return 0 in case we get null or undefined

    const buttonRef = useRef() // in the html use the ref attribute, if you want to modify the html tags do it inside the useEffect hook

    // onConnectedCallback (add an empty array), called after the jsx have been parsed
    useEffect(
        () =>
        {
            console.log('First render')

            console.log('Reference', buttonRef)

            buttonRef.current.style.backgroundColor = 'papayawhip'
            buttonRef.current.style.color = 'salmon'
        },
        [
            // empty array = function called once when the component is rendered for the first time
        ]
    )

    // onDisconnectedCallback (add a return + empty array)
    useEffect(
        () =>
        {
            // react will call that function when the component is being disposed of
            return () =>
            {
                console.log('Disposing')

                localStorage.removeItem(keyName)
            }
        },
        [

        ]
    )

    // on attribute update (count)
    useEffect(
        () =>
        {
            console.log('count updated', count)

            localStorage.setItem(keyName, count) // can only save strings
        },
        [
            count // = called when the count data has updated
        ]
    )

    const buttonClickedHandler = () =>
    {
        setCount(value => value + 1) // use the current value, better than setCount(count + 1)

        increment() // defined in the parent node
    }
    
    return <div>
        <div style={{color: color}}>Clicks count: {count}</div>
        <button ref={buttonRef} onClick={buttonClickedHandler}>Click me</button>
    </div>
}

export default Clicker