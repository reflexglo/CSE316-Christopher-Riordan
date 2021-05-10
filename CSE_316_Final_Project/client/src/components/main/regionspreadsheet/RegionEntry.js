import React, {useState} from 'react';
import { WInput, WNavItem } from 'wt-frontend';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';

const RegionEntry = (props) => {
    const activeStyle = props.isActive ? "active-region" : "item-region";
    const [nameEdit, setNameEdit] = useState(false);
    const [leaderEdit, setLeaderEdit] = useState(false);
    const [capitalEdit, setCapitalEdit] = useState(false);
    const left = " < ";
    const right = " > ";

    const handleViewing = () => {
        props.setViewing(true);
        props.setActiveRegion(props.region);

            let finalList = [];
            let subList = [];
            let interList = props.region.subregions;
            while(interList.length>0){
            subList = [];
            for(let i = 0;i<interList.length;i++){
                for(let k = 0;k<props.regions.length;k++){
                    if(interList[i] == props.regions[k]._id){
                        subList.push(props.regions[k]);
                        finalList.push(props.regions[k]);
                    }
                }
            }
            interList = [];
            for(let i = 0;i<subList.length;i++){
                interList.push(subList[i].subregions);
            }
        }
        let landmarkSubList = [];
        for(let i = 0;i<finalList.length;i++){
            for(let k = 0;k<finalList[i].landmarks.length;k++){
                let subLandmark = finalList[i].name + " - " + finalList[i].landmarks[k];
                landmarkSubList.push(subLandmark);
            }
        }
        props.setSubLandmarkList(landmarkSubList);
    }

    const handleSelecting = () => {
        props.setSelectedRegion(props.region);
        props.enterRegion(props.region);
    }

    const handleNameEdit = (e) => {
        const { name, value } = e.target;
        let prev = props.region.name;
        props.updateRegionField(props.region._id,"edit_name",value,prev);
        setTimeout(() => {setNameEdit(false);},250);
    }

    const handleCapitalEdit = (e) => {
        const { name, value } = e.target;
        let prev = props.region.capital;
        props.updateRegionField(props.region._id,"edit_capital",value,prev);
        setTimeout(() => {setCapitalEdit(false);},250);
    }

    const handleLeaderEdit = (e) => {
        const { name, value } = e.target;
        let prev = props.region.leader;
        props.updateRegionField(props.region._id,"edit_leader",value,prev);
        setTimeout(() => {setLeaderEdit(false);},250);
    }

    const handleNavigate = (field) => {
        if(field == "name"){
            setNameEdit(true);
            setCapitalEdit(false);
            setLeaderEdit(false);
        }
        if(field == "capital"){
            setNameEdit(false);
            setCapitalEdit(true);
            setLeaderEdit(false);
        }
        if(field == "leader"){
            setNameEdit(false);
            setCapitalEdit(false);
            setLeaderEdit(true);
        }
        console.log("here");
    }

    return(
        <WNavItem className={activeStyle}>
            <WRow>
                    <WCol size="2">
                        <WRow>
                            <WCol size="1">
                                <div onClick={() => props.deleteRegion(true,props.region)}>
                                    X
                                </div>
                            </WCol>
                            <WCol size="11">
                                {
                                    nameEdit?
                                    <WRow>
                                    <WCol size="11">
                                        <WInput className="list-item-edit" inputClass="list-item-edit-input" wType="lined" barAnimation="solid" name='name' onBlur={handleNameEdit} autoFocus={true} defaultValue={props.region.name} color="black"/>
                                    </WCol>
                                    <WCol size="1">
                                    <WButton onClick={() => handleNavigate("capital")}>{right}</WButton>
                                    </WCol>
                                </WRow>
                                     :
                                     <div className="region-entry" onClick={handleSelecting}>
                                        {props.region.name}&nbsp;
                                    </div> 
                                }
                            </WCol>
                        </WRow>
                            
                    </WCol>
                    <WCol size="2">
                        {
                            capitalEdit ?
                            <WRow>
                                <WCol size="1">
                                    <WButton onClick={() => handleNavigate("name")}>{left}</WButton>
                                </WCol>
                                <WCol size="10">
                                    <WInput className="list-item-edit" inputClass="list-item-edit-input" wType="lined" barAnimation="solid" name='name' onBlur={handleCapitalEdit} autoFocus={true} defaultValue={props.region.capital} color="black"/>
                                </WCol>
                                <WCol size="1">
                                <WButton onClick={() => handleNavigate("leader")}>{right}</WButton>
                                </WCol>
                            </WRow>
                            :
                            <div className="region-entry" onClick={() => setCapitalEdit(true)}>
                                {props.region.capital}&nbsp;
                            </div>   
                        }  
                    </WCol>
                    <WCol size="3">
                        {
                            leaderEdit ?
                            <WRow>
                                <WCol size="1">
                                    <WButton onClick={() => handleNavigate("capital")}>{left}</WButton>
                                </WCol>
                                <WCol size="11">
                                    <WInput className="list-item-edit" inputClass="list-item-edit-input" wType="lined" barAnimation="solid" name='name' onBlur={handleLeaderEdit} autoFocus={true} defaultValue={props.region.leader} color="black"/>
                                </WCol>
                            </WRow>
                            :
                            <div className="region-entry" onClick={() => setLeaderEdit(true)}>
                                {props.region.leader}&nbsp;
                            </div> 
                        }    
                    </WCol>
                    <WCol size="1">
                    </WCol>
                    <WCol size="4">
                        <div className="region-entry" onClick={handleViewing}>
                            {props.region.landmarks}&nbsp;
                        </div>     
                    </WCol>
            </WRow>
        </WNavItem>
    );
}

export default RegionEntry;