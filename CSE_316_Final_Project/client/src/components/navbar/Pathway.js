import React, { useState }                                from 'react';
import { WButton, WNavItem }                from 'wt-frontend';

const Pathway = (props) => {
    const pathNameArr = props.pathname.split(" > ");
    const arrow = " > ";

    const selectDirectory = (index) => {
        let pathArr = props.paths.split(" ");
        let pathId = pathArr[index];
        if(index>0){
            let thisRegion = props.regions.find(thisRegion => thisRegion._id === pathId);
            props.setSelectedRegion(thisRegion);
            let newPathname = "";
            let newPaths="";
            for(let i = 0;i<=index;i++){
                if(i<index){
                    newPathname += pathNameArr[i] + " > ";
                    newPaths += pathArr[i] + " ";
                }
                else{
                    newPathname += pathNameArr[i];
                    newPaths += pathArr[i];
                }
            }
            props.setPathname(newPathname);
            props.setPaths(newPaths);
        }
        else{
            props.setSelectedRegion(undefined);
            props.setPathname(pathNameArr[0]);
            props.setPaths(pathArr[0]);
        }
        props.setViewing(false);
    }

    return(
        <>
            {
                (pathNameArr.length > 0) && pathNameArr.map((path,index) =>(
                    <>
                        {
                            index < pathNameArr.length-1 &&
                            <>
                                <WButton className={"path-name"} onClick={() => selectDirectory(index)}>
                                    {path}
                                </WButton>
                                <div className={"path-arrow"}>
                                    {arrow}
                                </div>
                                </>
                        }
                        {
                            index == pathNameArr.length-1 &&
                                <WButton className={"path-name"} onClick={() => selectDirectory(index)}>
                                    {path}
                                </WButton>
                        }
                    </>
                    
                ))
            }
        </>
    );
}

export default Pathway;