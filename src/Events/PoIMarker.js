import React, { useContext, useState} from 'react'
import tweenCamera from "./CameraTravese"
import { useThree } from "@react-three/fiber";
import { EventContext, TimelineState } from './EventContext';
import * as THREE from "three";
import { ModelContext } from './ModelContext';
import { InfoPopup } from './InfoPopup';
import {Html} from "@react-three/drei";

/* 
    This is what draws PoI objects and control events related.
    
    Currently, the camera stops at coordinate that has hard-coded offset from the target object.
    the camera angle is 
    coords[x,y,z] = xyz coordinates of the sphere
    Get target object??
    targetCoords[x,y,z] = xyz coordinates of target object (picture)
    
    color: color (hex code) of the sphere
    onClick: function to be executed onClick.
 */
const PoIMarker = (props) => {
    // const textureImg = require("../Images/earth-reduced.jpg")
    let { eventState, setEventState, setTimelinePos, setActivePoster, activePoster } = useContext(EventContext)
    let { globeTexture, australiaTexture} = useContext(ModelContext)
    const { camera } = useThree();
    // const geometry = props.category === "Australia" ? <planeGeometry args={[2,2]}/> :<planeGeometry  args={[2,2]} />
    const geometry = <sphereGeometry args={[2,2]}/>

    // props has coordinates as array of 3 elements.

    const [hovered, setHover] = useState(false)
    
    // const cameraOffset = [0,-5,0]


    function handleClick() {
        const curPosition = new THREE.Vector3().copy(camera.position);
        if (eventState === TimelineState.TIMELINE) {
            setEventState(TimelineState.DISABLED);
            setTimelinePos(curPosition)
            tweenCamera(camera, props.targetCoords, "timeline", () => {
                setEventState(TimelineState.PoI)
            }
            );
            // activate poster
            setActivePoster(props.index)
            setHover(false)
        }
    }

    function handleHoverIn() {

        if (eventState === TimelineState.TIMELINE) {
            props.hoverIn(props.index)
            setHover(true)
            // display info window
        }
    }

    function handleHoverOut() {

        if (eventState === TimelineState.TIMELINE) {
            props.hoverOut()
            setHover(false)
        }
    }


    return (
        <>
            <mesh
                position={props.position}
                scale={hovered ? 1.2 : 1}
                rotation={[1.5708,0, 0]}
                onClick={handleClick}
                onPointerOver={handleHoverIn}
                onPointerOut={handleHoverOut}
            >
                {geometry}
                <meshBasicMaterial color={props.category === "World" ? "#113a63" : "#52080b"}/>
                <InfoPopup text={props.title} className={hovered && eventState === TimelineState.TIMELINE ? "visible" : "invisible"}/>

            </mesh>
            <HtmlPage visible={eventState === TimelineState.PoI
            && activePoster === props.index ? "visible" : "invisible"} targetCoords={props.targetCoords}
            html={props.html}/>
        </>


    )

}

const HtmlPage = (props) => {

    return(
        <group position={[props.targetCoords[0] - 4.5, props.targetCoords[1], props.targetCoords[2] + 3]}>
            <Html className={props.visible} style={{backgroundColor: "black"}}>
                {/* <div className="about-container"> */}

                <iframe src={props.html} title="about" className="about-container" >

                </iframe>

                {/* </div> */}
            </Html>
        </group>

    )
}
export default PoIMarker;