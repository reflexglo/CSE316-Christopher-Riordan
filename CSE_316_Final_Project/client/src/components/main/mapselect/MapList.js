import React                            from 'react';
import MapEntry                         from '../mapselect/MapEntry'

const MapList = (props) => {
    if(props.activeMap){
        return(
            <>
                <MapEntry
                    id={props.activeMap.id} key={props.activeMap.id} name={props.activeMap.name}
                    _id={props.activeMap._id} setShowDelete={props.setShowDelete}
                    updateMapField={props.updateMapField} setActiveMap={props.setActiveMap}
                    map={props.activeMap} isActive={true}
                />
                {
                    props.maps &&
                    props.maps.filter(thisMap => thisMap._id != props.activeMap._id).map(thisMap =>
                        (
                                    <MapEntry
                                    id={thisMap.id} key={thisMap.id} name={thisMap.name}
                                    _id={thisMap._id} setShowDelete={props.setShowDelete}
                                    updateMapField={props.updateMapField} setActiveMap={props.setActiveMap}
                                    map={thisMap} isActive={false}
                                 />
                        )
                    )
                }
            </>
        );
    }
    else{
        return(
            props.maps &&
            props.maps.map(thisMap =>
                (
                    <MapEntry
                            id={thisMap.id} key={thisMap.id} name={thisMap.name}
                            _id={thisMap._id} setShowDelete={props.setShowDelete}
                            updateMapField={props.updateMapField} setActiveMap={props.setActiveMap}
                            map={thisMap} isActive={false}
                         />
                )
            )
        );
    }
}

export default MapList;