import * as THREE from 'three'
import img from '../Images/warPic.png'
import React, { useContext, useMemo} from "react";
import tweenCamera from "./CameraTravese";
import { EventContext, TimelineState } from "./EventContext";
import { useThree } from "@react-three/fiber";
import PoIAlbum from "./PoIAlbum";
import {TextureLoader} from "three";


export const PoIThumbnail = (props) => {
    const textureImg = require("../Images/POI-thumbnails/" + props.event.category +"/" + props.event.thumbnail)
    const { eventState, setEventState, timelinePos, setTimelinePos, setActivePoster, cameraOffset } = useContext(EventContext)


    const { camera } = useThree();
    // offset from poster
    // const cameraOffset = [0,-5.5,0]

    function handleClick() {
        const curPosition = new THREE.Vector3().copy(camera.position);
        // same as poimarker
        if(eventState === TimelineState.TIMELINE){
            setEventState(TimelineState.DISABLED)
            console.log(curPosition)
            setTimelinePos(curPosition)

            tweenCamera(camera, props.targetCoords, "toPoster", () => setEventState(TimelineState.PoI)
            );
            // tweenCamera(camera, cameraOffset, props.targetCoords, [0,0,0], props.duration, false, () => {setEventState(TimelineState.PoI)});
            setActivePoster(props.index)
        }
    }

    function handleHoverIn(){
        
        if(eventState === TimelineState.TIMELINE){
            props.hoverIn(props.index)
        }
    }

    function handleHoverOut(){

        if(eventState === TimelineState.TIMELINE){
            props.hoverOut()
        }
    }

    // load thumbnail texture
    // const texture = useMemo(() => new THREE.TextureLoader().load(eventData.events[props.index].thumbnail.default), []);
    const texture = useMemo(() => new THREE.TextureLoader().load(textureImg.default), []);

    return (

        <group rotation={props.rotation}
            position={props.position}
            onClick={handleClick}
            onPointerEnter={handleHoverIn}
            onPointerLeave={handleHoverOut}
        >
            <mesh>
                <planeGeometry args={[9, 9]} />
                <meshBasicMaterial map={texture} />
            </mesh>
            <mesh position={[0,0,-0.3]}>
                <boxGeometry args={[12.9,10.8,0.5]}/>
                <meshBasicMaterial map={props.brickTexture}/>
            </mesh>
        </group>
    )
}


export default PoIThumbnail