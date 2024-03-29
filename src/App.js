import './App.css';
import { Canvas } from "@react-three/fiber";
import React from 'react';
import {SceneEventController} from './Scene';
import {Loader} from "@react-three/drei"




const App = () => {

    return (
        <>
            <Canvas>
                <SceneEventController/>
                <color attach="background" args={"#0f1117"} />
                <ambientLight insensity={1} />
            </Canvas>
            <Loader/>
        </>
    );
}

export default App;
