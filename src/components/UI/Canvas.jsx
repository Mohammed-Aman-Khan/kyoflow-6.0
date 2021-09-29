import { createElement } from 'react'
import { useSelector } from "react-redux"
import makeStyles from '@material-ui/core/styles/makeStyles'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import GridLines from 'react-gridlines'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import cls from 'classnames'
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    fullHeight: {
        height: '100%',
    },
})

const Canvas = () => {
    const classes = useStyles()
    const currentId = useSelector(state => state.currentComponent)
    const current = (useSelector(state => state.myComponents) ?? []).find(item => item.componentId === currentId) ?? null

    return <TransformWrapper centerOnInit centerZoomedOut>
        { ({ zoomIn, zoomOut, resetTransform, ...rest }) =>
            <GridLines className={ cls('grid-area', classes.fullHeight) } cellWidth={ 10 } strokeWidth={ 1 } cellWidth2={ 10 }>
                <Tooltip placement="left" title={ <Typography>Reset Zoom</Typography> }>
                    <Fab
                        size="small"
                        color="primary"
                        style={ { position: 'absolute', right: '20%', top: 10, zIndex: 2147483647 } }
                        onClick={ () => resetTransform() }
                    >
                        <YoutubeSearchedForIcon />
                    </Fab>
                </Tooltip>
                <TransformComponent wrapperStyle={ { height: '100%', width: '100%' } }>
                    {
                        currentId && current &&
                        createElement(
                            current.type,
                            {
                                style: current.style,
                            },
                            current.content
                        )
                    }
                </TransformComponent>
            </GridLines> }
    </TransformWrapper>
}

export default Canvas