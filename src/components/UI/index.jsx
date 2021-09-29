import makeStyles from '@material-ui/core/styles/makeStyles'
import MyComponents from './MyComponents'
import Canvas from './Canvas'
import Configuration from './Configuration'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        height: '100vh',
    },
    leftPanel: {
        padding: 10,
        backgroundColor: '#E0E0E0',
        width: '15%',
        overflowY: 'auto',
    },
    centerPanel: {
        width: '70%',
    },
    rightPanel: {
        padding: 10,
        backgroundColor: '#E0E0E0',
        width: '20%',
        overflowY: 'auto',
    },
})

const UI = () => {
    const classes = useStyles()

    return <div className={ classes.container }>
        <div className={ classes.leftPanel }>
            <MyComponents />
        </div>
        <div className={ classes.centerPanel }>
            <Canvas />
        </div>
        <div className={ classes.rightPanel }>
            <Configuration />
        </div>
    </div>
}

export default UI