import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Editor from "@monaco-editor/react"
import Alert from '@material-ui/lab/Alert'
import { useRef, useState } from 'react'
import { addFunction, removeFunction } from '../../../Store/MyComponents'
import { useDispatch } from 'react-redux'

const NewFunction = ({ currentId, functions }) => {
    const dispatch = useDispatch()
    const [ openDetails, setOpenDetails ] = useState(false)
    const [ openCode, setOpenCode ] = useState(false)
    const [ functionName, setFunctionName ] = useState('')
    const [ functionParams, setFunctionParams ] = useState('')
    const [ functionDesc, setFunctionDesc ] = useState('')
    const codeEditorRef = useRef()

    const addDetails = () => {
        if (!functionName) {
            alert('Function Name Required')
            return
        }
        if (functions.map(i => i.name).includes(functionName)) {
            alert('Function Name Used')
            return
        }
        setOpenDetails(false)
        setOpenCode(true)
    }
    const back = () => {
        setOpenCode(false)
        setOpenDetails(true)
    }
    const reset = () => {
        setOpenCode(false)
        setOpenDetails(false)
        setFunctionName('')
        setFunctionParams('')
        setFunctionDesc('')
    }
    const addNewFunction = () => {
        dispatch(
            addFunction({
                componentId: currentId,
                name: functionName,
                code: codeEditorRef.current.getValue(),
            })
        )
        reset()
    }

    return <>
        <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={ () => setOpenDetails(true) }
        >
            Add Function
        </Button>
        <Dialog
            fullWidth
            maxWidth="sm"
            open={ openDetails }
            onClose={ e => e.preventDefault() }
        >
            <DialogTitle>Add Function Details</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Function Name"
                    value={ functionName }
                    onChange={ e => setFunctionName(e.target.value) }
                    helperText="Must be a valid JavaScript Identifier"
                />
                <br /><br />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Function Parameters"
                    value={ functionParams }
                    onChange={ e => setFunctionParams(e.target.value) }
                    helperText={ `Examples - num, arg1, arg2 = '', { key1, key2 }... (Default values supported)` }
                />
                <br /><br />
                <TextField
                    fullWidth
                    multiline
                    minRows={ 3 }
                    variant="outlined"
                    label="Function Description"
                    value={ functionDesc }
                    onChange={ e => setFunctionDesc(e.target.value) }
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={ reset }
                >
                    Cancel
                </Button>
                <Button
                    onClick={ addDetails }
                    color="primary"
                    variant="contained"
                    disableElevation
                >
                    Next
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            fullWidth
            maxWidth="md"
            open={ openCode }
            onClose={ e => e.preventDefault() }
        >
            <DialogTitle>Add Function Code</DialogTitle>
            <DialogContent
                style={ { overflow: 'hidden', } }
            >
                <Editor
                    height={ 500 }
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    defaultValue={ [
                        '',
                        functionDesc ? `/* ${ functionDesc } */` : '',
                        `export const ${ functionName } = (${ functionParams }) => {`,
                        '',
                        '\t/* Start Typing Here... */',
                        '',
                        '}',
                    ].join('\n') }
                    onMount={ (editor, monaco) => codeEditorRef.current = editor }
                />
            </DialogContent>
            <DialogActions>
                <Alert style={ { flexGrow: 1 } } severity="warning">
                    Do not edit the function name, parameters or exports through the Code Editor
                </Alert>
                <Button
                    onClick={ reset }
                >
                    Cancel
                </Button>
                <Button
                    onClick={ back }
                >
                    Back
                </Button>
                <Button
                    onClick={ addNewFunction }
                    color="primary"
                    variant="contained"
                    disableElevation
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

const Functions = ({ current, currentId }) => {
    const dispatch = useDispatch()

    return <>
        <center><Typography>Functions</Typography></center>
        <br />
        <NewFunction { ...{ currentId, functions: current?.functions ?? [] } } />
        <br />
        <List>
            {
                (current?.functions ?? [])
                    .map((func, index) =>
                        <ListItem key={ index }>
                            <ListItemText primary={ <>
                                <Typography variant="body2">{ func.name }</Typography>
                            </> } />
                            <IconButton
                                size="small"
                                onClick={ () => dispatch(removeFunction({ name: func.name, componentId: currentId })) }
                            >
                                <CloseIcon />
                            </IconButton>
                        </ListItem>
                    )
            }
        </List>
    </>
}

export default Functions