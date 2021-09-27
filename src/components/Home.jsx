import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

const useStyles = createUseStyles({
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
    },
    item: {
        backgroundColor: 'black',
        color: 'white',
        height: 80,
        width: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: 30,
        borderRadius: 20,
    },
})

const Home = () => {
    const classes = useStyles()

    return <div className={ classes.container }>
        <Link
            to="/state"
            className={ classes.item }
        >
            State
        </Link>
        <Link
            to="/ui"
            className={ classes.item }
        >
            UI
        </Link>
    </div>
}

export default Home