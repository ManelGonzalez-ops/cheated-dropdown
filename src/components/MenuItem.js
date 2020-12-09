import React, { useEffect, useRef } from 'react'
import { Transition } from 'react-transition-group'
import { Dropdown } from './Dropdown'


export const MenuItem = ({ info, handleHover, selection, setSelection, setCurrentRef, setFirstRef = null, firstRef = null }) => {
    const navItem = useRef(null)
   
    const handleEnter = (id) => {
        if (!firstRef && info.id === 1) {
            setFirstRef(navItem.current)

        }
        setCurrentRef(navItem.current)
        handleHover(id)
    }

    return (
        <li
            style={{ position: "relative" }}
            onMouseEnter={() => { handleEnter(info.id) }}
            ref={navItem}
        // onMouseLeave={debounceMouseLeave}
        >
            <h5>{info.title}</h5>
            {/* <Dropdown/> */}
            {/* <ul
                style={{
                    ...defaultStyles
                }}
                ref={dropdown}
            >
                {selection && selection.dropdownItems.map((item, index) => (
                    <li
                        key={index}
                    >{item}</li>
                ))}
            </ul> */}
        </li>
    )
}
