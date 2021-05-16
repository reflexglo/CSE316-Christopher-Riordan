import React, { useState }                                from 'react';
import { WButton, WNavItem }                from 'wt-frontend';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';

const Pathway = (props) => {
    const pathNameArr = props.pathname.split(" > ");
    const arrow = " > ";
    const left = " < "

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
        props.tps.clearAllTransactions();
    }

    return(
        <>
        {
            props.viewing ?
            <>
            <WRow>
                <WCol size="10">
                {
                (pathNameArr.length > 0) && pathNameArr.map((path,index) =>(
                    <>
                        {
                            index < pathNameArr.length-2 &&
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
                            index == pathNameArr.length-2 &&
                                <WButton className={"path-name"} onClick={() => selectDirectory(index)}>
                                    {path}
                                </WButton>
                        }
                    </>
                    
                ))
            }
                </WCol>
                <WCol size="2">
                    <ul>
                    <div className="nav-arrow" onClick={props.viewNextRegion}>
                        {left}
                    </div>
                    <div>
                        &nbsp; &nbsp; &nbsp;
                    </div>
                    <div className="nav-arrow" onClick={props.viewPreviousRegion}>
                        {arrow}
                    </div>
                    </ul>
                </WCol>
            </WRow>
            </>
            :
            <>
            {
                (pathNameArr.length > 0) && pathNameArr.map((path,index) =>(
                    <>
                        {
                            index < pathNameArr.length-2 &&
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
                            index == pathNameArr.length-2 &&
                                <WButton className={"path-name"} onClick={() => selectDirectory(index)}>
                                    {path}
                                </WButton>
                        }
                    </>
                    
                ))
            }
            </>
        }
        </>
    );
}

export default Pathway;