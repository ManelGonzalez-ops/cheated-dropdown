import React, { useEffect, useRef, useState } from 'react'
import { MenuItem } from './MenuItem'
import { Transition } from 'react-transition-group'
import { Dropdown } from './Dropdown'

const menuItems = [
    {
        title: "Home",
        dropdownItems: ["amazon", "google", "facebook"],
        id: 1
    },
    {
        title: "About",
        dropdownItems: ["pesca", "futbol"],
        id: 2
    },
    {
        title: "Work",
        dropdownItems: ["autentic"],
        id: 3
    },
    {
        title: "Contact",
        dropdownItems: ["amazon", "google", "facebook", "amazon", "google"],
        id: 4
    },
]

const timeout = {
    appear: 400,
    enter: 400,
    exit: 50,
}

export const Navbar = () => {
    const [selection, setSelection] = useState("")
    //const dropdown = useRef(null)

    const [{ height, width, transform }, setDimensions] = useState({ height: 0, width: 0, transform: 0 })
    //this is to calculate the horizontal movemente
    const [currentRef, setCurrentRef] = useState("")
    const [currentRefXStored, setCurrentRefXStored] = useState(null)
    //this to use the first ref as reference for horizonat mov
    const [firstRef, setFirstRef] = useState("")
    //this is to track diemnsions of the dropdown of the selected item
    const [dropdownRef, setDropdownRef] = useState("")
    const dropdownContainer = useRef(null)
    const handleHover = (id) => {
        if (selection) {

        }
        setSelection(menuItems.find(item => item.id === id))
    }



    useEffect(() => {
        if (selection && dropdownRef) {
            const transformAmount = currentRef.getBoundingClientRect().x +
                currentRef.getBoundingClientRect().width - firstRef.getBoundingClientRect().x
            setCurrentRefXStored(currentRef.getBoundingClientRect().x - dropdownContainer.current.getBoundingClientRect().x - dropdownContainer.current.getBoundingClientRect().width)
            setDimensions({
                height: dropdownRef.offsetHeight,
                width: dropdownRef.offsetWidth,
                transform: `translateX(${transformAmount}px)`
            })
            //console.log("diferencia", dropdownRef.getBoundingClientRect().x - currentRef.getBoundingClientRect().x)
            //console.log(currentRef.getBoundingClientRect().x, "ostia")
        }
    }, [dropdownRef])



    return (
        <header>
            <a href="#"><h3>logo</h3></a>
            <nav
                style={{ position: "relative" }}
                onMouseLeave={(e) => {
                    console.log(e.target, "target")
                    console.log(e.target.id, "target id")
                    if (e.target.id === "dropdown") setSelection("")
                }}
            >
                <ul
                    className="ul-nav"


                >
                    <MenuItem key={menuItems[0].id} handleHover={handleHover} setCurrentRef={setCurrentRef} firstRef={firstRef} setFirstRef={setFirstRef} info={menuItems[0]} setDropdownRef={setDropdownRef}
                        selection={selection}

                    />
                    {menuItems.slice(1, menuItems.length).map(item => (
                        <MenuItem
                            key={item.id}
                            info={item}
                            handleHover={handleHover}
                            selection={selection}
                            setSelection={setSelection}
                            setCurrentRef={setCurrentRef}
                            setDropdownRef={setDropdownRef}
                            
                        //isSelected = {item.id === selection.id}
                        />))}
                </ul>
                <div
                    id="dropdown"
                    className="dropdown-container"
                    style={{ position: "absolute", height, width, transform, background: "lightblue", transition: "all 0.4s ease", overflow: "hidden", zIndex: "-20" }}
                    ref={dropdownContainer}
                    >
                    {menuItems && menuItems.map(item => (
                        <Transition
                            in={selection.id === item.id}
                            timeout={timeout}
                            mountOnEnter
                            unmountOnExit
                        >{
                                state => (
                                    <Dropdown
                                        state={state}
                                        info={item}
                                        selection={selection}
                                        setDropdownRef={setDropdownRef}
                                        setSelection={setSelection}
                                        currentRefXStored={currentRefXStored}
                                    />

                                )
                            }

                        </Transition>
                    ))}
                </div>
            </nav>
        </header>
    )
}

const ItemAnimated = ({ selection }) => {

    const [selectionDefered, setSelectionDefered] = useState()
    useEffect(() => {
        if (selection) {
            setTimeout(() => {
                setSelectionDefered(selection)
            }, 200)
        } else {
            //if the dropdown was close we won't settimout
            setSelectionDefered(selection)
        }
    }, [selection])

    return (
        <>
            {selectionDefered && selectionDefered.dropdownItems.map((item, index) => (
                <li
                    key={index}
                >{item}</li>
            ))}
        </>)
}