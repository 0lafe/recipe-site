import React, { useState } from "react";

const DropDown = ({ options, callback, selected }) => {
    const [expanded, setExpanded] = useState(false);

    function expand() {
        setExpanded(true);
    }

    function close() {
        setExpanded(false);
    }

    function select(event) {
        const value = event.target.textContent;
        callback(value);
        close();
    }

    return (
        <div className="dropdown" tabIndex={0}  onBlur={close} >
            <span onClick={expand} className="dropdown-selected">{selected}</span>
            {expanded ? (
                <div className="dropdown-options-list">
                    {options.map((O) => (
                        <div className="dropdown-option" key={O}>
                            <span onClick={select}>{O}</span>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default DropDown