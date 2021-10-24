import React, { useMemo, useState, useContext } from 'react'
import { EventContext, TimelineState } from "./EventContext";
import { PoIMarkerGroup } from './PoIMarkerGroup';
import { PoIThumbnailGroup } from './PoIThumbnailGroup';
import { PoIPosterGroup } from './PoIPosterGroup';
import { useThree } from "@react-three/fiber";
import tweenCamera from "./CameraTravese";

const PoICollection = (props) => {

    const eventData = require("./eventData.json")
    const { eventState, setEventState, timelinePos } = useContext(EventContext)
    const { camera } = useThree();

    // spotlight related
    const [lightPos, SetlightPos] = useState([0, -1, 1])
    const [lightTarget, SetlightTarget] = useState([0, 0, 0])
    const [lightIntensity, SetlightIntensity] = useState([0])
    const light = useMemo(() => <rectAreaLight
        position={lightPos}
        intensity={lightIntensity}
        angle={0.1}
        lookAt={lightTarget}
    />,
        [lightPos, lightIntensity, lightTarget])

    // lists for collection
    // const activeStateList = Array.apply(null, Array(20)).map(() => false)
    // this indicates what poster is active
    const posterPosList = useMemo(() => calcPosterPos(), [])

    function calcPosterPos() {

        const posterXOffset = 20
        const posterYInterval = 13
        const posterZ = 0
        const positions = []

        eventData.events.forEach((element, index) => {

            let pos = [0, 0, posterZ]
            pos[1] = Math.round(index / 2 - 0.5) * posterYInterval
                + props.platformSettings.horizontalStartCoordinate
            if (index % 2 === 0) {
                pos[0] = -posterXOffset
            } else {
                pos[0] = posterXOffset
            }
            positions.push(pos)
        })
        return positions
    }

    function onHoverIn(index) {
        
        // this sets the offset
        SetlightPos([posterPosList[index][0], posterPosList[index][1] - 5, posterPosList[index][2] + 10])
        SetlightTarget([posterPosList[index][0], posterPosList[index][1], posterPosList[index][2]])
        SetlightIntensity(3)

    }

    function onHoverOut() {
        
        SetlightIntensity(0.1)
    }

    const handleTraverseBack = () => {
        if (eventState === TimelineState.PoI) {
            setEventState(TimelineState.DISABLED)
            tweenCamera(camera, [timelinePos.x, timelinePos.y + 5, timelinePos.z], props.duration, true,
                () => setEventState(TimelineState.TIMELINE))
        }
    }

    return (
        <group
            onPointerMissed={handleTraverseBack}
        >
            <PoIMarkerGroup
                eventData={eventData}
                platformSettings={props.platformSettings}
                posterPosList={posterPosList}
                hoverIn={onHoverIn}
                hoverOut={onHoverOut}
            />
            <PoIThumbnailGroup
                eventData={eventData}
                posterPosList={posterPosList}
                hoverIn={onHoverIn}
                hoverOut={onHoverOut}
            />
            <PoIPosterGroup
                eventData={eventData}
                posterPosList={posterPosList}
                // activePoster={activePoster}
            />
            {light}
        </group>
    )
}

export default PoICollection;