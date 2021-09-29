import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Autocomplete from '@material-ui/lab/Autocomplete'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import { CSSProperties } from '../Utilities'
import capitalize from 'lodash/capitalize'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCssProperty, deleteCssProperty } from '../../../Store/MyComponents'

const CSS = ({ current, currentId }) => {
    const dispatch = useDispatch()
    const [ autoCompleteValue, setAutoCompleteValue ] = useState(null)
    const [ newPropertyName, setNewPropertyName ] = useState('')
    const [ newPropertyValue, setNewPropertyValue ] = useState('')

    const addNewProperty = () => {
        if (newPropertyName && newPropertyValue) {
            dispatch(
                addCssProperty({
                    componentId: currentId,
                    property: newPropertyName,
                    value: newPropertyValue,
                })
            )
            setNewPropertyName('')
            setNewPropertyValue('')
        }
    }

    return <>
        <center><Typography>Design (CSS)</Typography></center>
        <br />
        <Autocomplete
            fullWidth
            disableListWrap
            options={ CSSProperties }
            value={ autoCompleteValue }
            onChange={ (e, newValue) => setAutoCompleteValue(newValue) }
            inputValue={ newPropertyName.split('-').map(capitalize).join(' ') }
            onInputChange={ (e, newInputValue) => setNewPropertyName(newInputValue) }
            renderInput={ params => <TextField { ...params } variant="outlined" label="CSS Property" /> }
            renderOption={ option => <Typography noWrap>{ option.split('-').map(capitalize).join(' ') }</Typography> }
        />
        <br />
        <TextField
            fullWidth
            variant="outlined"
            label="Property Value"
            value={ newPropertyValue }
            onChange={ e => setNewPropertyValue(e.target.value) }
        />
        <br /><br />
        <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={ addNewProperty }
        >
            Add Style
        </Button>
        <br />
        <List>
            {
                Object.entries(current.style)
                    .map(([ key, value ], index) =>
                        <ListItem key={ index }>
                            <ListItemText primary={ <>
                                <Typography variant="overline">{ key.split('-').map(capitalize).join(' ') }</Typography>
                                <Typography variant="body2">{ value }</Typography>
                            </> } />
                            <IconButton
                                size="small"
                                onClick={ () => dispatch(deleteCssProperty({ componentId: currentId, property: key })) }
                            >
                                <CloseIcon />
                            </IconButton>
                        </ListItem>
                    )
            }
        </List>
    </>
}

export default CSS