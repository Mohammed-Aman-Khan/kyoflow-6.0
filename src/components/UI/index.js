import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        height: '100vh',
    },
    leftPanel: {
        backgroundColor: '#E0E0E0',
        height: '100%',
        width: '15%',
    },
    centerPanel: {
        height: '100%',
        width: '70%',
    },
    rightPanel: {
        backgroundColor: '#E0E0E0',
        height: '100%',
        width: '15%',
    },
})

const UI = () => {
    const classes = useStyles()

    return <div className={ classes.container }>
        <div className={ classes.leftPanel }>

        </div>
        <div className={ classes.centerPanel }>

        </div>
        <div className={ classes.rightPanel }>

        </div>
    </div>
}

export default UI