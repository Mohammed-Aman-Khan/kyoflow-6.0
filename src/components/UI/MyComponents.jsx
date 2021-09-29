import { Fragment, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'
import { ComponentTypes, generateUniqueID } from './Utilities'
import { addNewComponent, deleteComponent } from '../../Store/MyComponents'
import { setCurrentComponent } from '../../Store/CurrentComponent'
import Code from '../Downloads'

const MyComponents = () => {
    const [ open, setOpen ] = useState(false)
    const myComponents = useSelector(state => state.myComponents) ?? []
    const dispatch = useDispatch()
    const componentTypeRef = useRef()
    const componentNameRef = useRef()
    const addNew = () => {
        dispatch(
            addNewComponent({
                componentId: generateUniqueID(),
                type: componentTypeRef.current.value,
                name: componentNameRef.current.value,
                style: {},
                contentType: 'Text',
                content: componentNameRef.current.value,
                functions: [],
            })
        )
        setOpen(false)
    }
    const download = () => {
        const myCode = new Code(myComponents)
        myCode.generateCodeFiles()
        myCode.download()
    }

    return <>
        <Button
            color="primary"
            variant="contained"
            disableElevation
            fullWidth
            onClick={ () => setOpen(true) }
        >
            Add Component
        </Button>
        <hr /><br />
        <center><Typography variant="h5">My Components</Typography></center>
        <List>
            {
                myComponents
                    .map(({ componentId, name, type }, index) =>
                        <Fragment key={ componentId }>
                            <ListItem button onClick={ () => dispatch(setCurrentComponent(componentId)) }>
                                <IconButton onClick={ () => dispatch(deleteComponent(componentId)) }>
                                    <DeleteIcon />
                                </IconButton>
                                <ListItemText primary={ `${ name } - ${ type }` } />
                            </ListItem>
                            { index + 1 !== myComponents.length && <Divider /> }
                        </Fragment>
                    )
            }
        </List>
        {
            myComponents.length ?
                <Tooltip
                    placement="right"
                    title={ <Typography>Download Code</Typography> }
                >
                    <Fab
                        size="medium"
                        color="primary"
                        style={ { position: 'fixed', bottom: 10, left: 10 } }
                        onClick={ download }
                    >
                        <GetAppIcon />
                    </Fab>
                </Tooltip> : <></>
        }
        <Dialog
            fullWidth
            maxWidth="sm"
            open={ open }
            onClose={ e => e.preventDefault() }
        >
            <DialogTitle>Add New Component</DialogTitle>
            <DialogContent>
                <FormControl
                    fullWidth
                    variant="outlined"
                >
                    <InputLabel>Component Type</InputLabel>
                    <Select
                        defaultValue=""
                        inputRef={ componentTypeRef }
                        label="Component Type"
                    >
                        {
                            ComponentTypes
                                .map(component =>
                                    <MenuItem key={ component } value={ component }>
                                        { component }
                                    </MenuItem>
                                )
                        }
                    </Select>
                </FormControl>
                <br /><br />
                <TextField
                    fullWidth
                    defaultValue=""
                    variant="outlined"
                    label="Component Name"
                    inputRef={ componentNameRef }
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={ () => setOpen(false) }
                >
                    Cancel
                </Button>
                <Button
                    onClick={ addNew }
                    color="primary"
                    variant="contained"
                    disableElevation
                >
                    Create Component
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default MyComponents