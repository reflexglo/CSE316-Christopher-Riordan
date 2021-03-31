import React        from 'react';
import SidebarEntry from './SidebarEntry';

const SidebarList = (props) => {
    return (
        <>

            {
                props.activeName != undefined ?
                <SidebarEntry
                handleSetActive={props.handleSetActive} activeid={props.activeid}
                id={props.activeid} key={props.activeid} name={props.activeName} _id={props.active_id}
                updateListField={props.updateListField}
                />
                :<div></div>
            }
            {
                
                props.todolists &&
                props.todolists.filter(thisList =>
                    thisList.id !== props.activeid).map(todo => (
                    <SidebarEntry
                        handleSetActive={props.handleSetActive} activeid={props.activeid}
                        id={todo.id} key={todo.id} name={todo.name} _id={todo._id}
                        updateListField={props.updateListField}
                    />
                ))
            }
        </>
    );
};

export default SidebarList;