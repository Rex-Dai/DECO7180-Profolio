import Line from './Line'
import React from "react";
import TextLabel from "./TextLabel";


const Platform = (props) => {

    let verStart, verInt, horiStart, horiInt;

    verStart = props.platformSettings.verticalStartCoordinate;
    verInt = props.platformSettings.verticalInterval;
    horiStart = props.platformSettings.horizontalStartCoordinate;
    horiInt = props.platformSettings.horizontalInterval;

    const lineList = [];
    const label = [];
    const text = ["2 A", "2 C", "2 D", "2 E", "Overall"]


    // the index props for vertical line stands for the coordinate at x axis
    for (let i = 0; i < 5; i++) {
        lineList.push(<Line index={verStart +
            i * verInt} type={'vertical'} key={"ver" + i} />);
    }

    // the index props for horizontal line stands for the y coordinate
    for (let i = 0; i < 5; i++) {
        lineList.push(<Line index={horiStart +
            i * horiInt} type={'horizontal'} key={"hor" + i} />);
    }

    // the index props for monthIndicator stands for the year and month
    // e.g. index = 1402 will be interpreted as 02/1914, no additional indicator for Jan.
    for (let i = 14; i < 19; i++) {
        label.push(<TextLabel position={[verStart - 9,
        horiStart + (i - 14) * horiInt, -3]} text={(text[i - 14])}
            colour={"#ffffff"}
            key={i} />)
    }
    label.push(<TextLabel position={[props.platformSettings.verticalStartCoordinate,
        props.platformSettings.horizontalStartCoordinate, -3]} text={"Documentation"} key="Australia" colour={"#ffff00"}
        size={1} height={0.2}/>)
    label.push(<TextLabel position={[props.platformSettings.verticalStartCoordinate + 12.5,
        props.platformSettings.horizontalStartCoordinate, -3]} text={"Reflection"} key="World" colour={"#ffff00"}
                          size={1} height={0.2}/>)
    // these are the category labels

    return (
        <group>
            {lineList}
            {label}
        </group>
    )

}

export default Platform;