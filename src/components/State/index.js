import { useEffect, useState } from "react"

const State = () => {


    const initialState = (parameter) => {

        switch (parameter) {
            case "bool":
                return false
            case "number":
                return 0
            case "string":
                return ''
            case "object":
                return {}
            case "array":
                return []
            default: return null;
        }


    }

    // const data




    const [state, setState] = useState() // created magic state need 

    const dataType = (newFruit) => {
        setState(state => initialState(newFruit))
    }

    const setValue = (data) => {
        setState(data)
    }


    useEffect(() => {
        console.log('state:', state)
    }, [state])






    return <>
        <form>
            <select
                onChange={(event) => dataType(event.target.value)}
            >
                <option value="array">array</option>
                <option value="bool">bool</option>
                <option value="string">string</option>
                <option value="object">object</option>
                <option value="number">number</option>
            </select>
        </form>
        {
            typeof state === "boolean"
                ?
                <div>
                    <input type="checkbox" defaultChecked={state} onChange={() => setState(!state)} />
                </div>
                :
                <div>
                    <label>Please specify:</label>
                    <input value={state} onInput={e => setValue(e.target.value)} />
                </div>
        }



        <div> your state : {state}</div>
    </>
}

export default State