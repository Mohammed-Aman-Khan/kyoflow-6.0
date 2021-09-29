import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch } from 'react-redux'
import { setContent } from '../../../Store/MyComponents'

const Content = ({ currentId, current }) => {
    const dispatch = useDispatch()

    const setContentType = type => {

    }

    return <>
        <center><Typography>Content</Typography></center>
        <br />
        <FormControl variant="outlined" disabled fullWidth>
            <InputLabel>Content Type</InputLabel>
            <Select
                value={ current.contentType }
                label="Content Type"
                onChange={ e => setContentType(e.target.value) }
            >
                <MenuItem value="Text">Text</MenuItem>
                <MenuItem value="Component">Component</MenuItem>
            </Select>
        </FormControl>
        <br /><br />
        <TextField
            fullWidth
            label={ current.contentType }
            variant="outlined"
            value={ current.content }
            onChange={ e => dispatch(setContent({ componentId: currentId, content: e.target.value })) }
        />
    </>
}

export default Content