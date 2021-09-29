import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import Content from './Content'
import CSS from './CSS'
import Functions from './Functions'

const Configuration = () => {
    const currentId = useSelector(state => state.currentComponent)
    const current = (useSelector(state => state.myComponents) ?? []).find(item => item.componentId === currentId)

    return <>
        <Typography variant="h5">Component Configuration</Typography>
        <hr />
        {
            currentId && current ?
                <>
                    <Content { ...{ current, currentId } } />
                    <br /><br /><hr />
                    <CSS { ...{ current, currentId } } />
                    <hr />
                    <Functions { ...{ current, currentId } } />
                </> :
                <>
                    <br />
                    <center>
                        <Typography>Select a Component to start customizing</Typography>
                    </center>
                </>
        }
    </>
}

export default Configuration