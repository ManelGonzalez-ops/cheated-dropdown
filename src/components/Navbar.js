import React, { useEffect, useRef, useState} from 'react'
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
        title: "Free time",
        dropdownItems: ["autentic", "facebook", "amazon"],
        id: 4
    },
    {
        title: "Contact",
        dropdownItems: ["amazon", "google", "facebook", "amazon", "google"],
        id: 5
    },
]

const timeout = {
    appear: 0,
    enter: 0,
    exit: 0,
}

export const Navbar = () => {
    const [selection, setSelection] = useState("")
    const [{ height, width, transform }, setDimensions] = useState({ height: 0, width: 0, transform: 0, left: 0 })
    const [currentRef, setCurrentRef] = useState("")
    const [firstRef, setFirstRef] = useState("")
    const [dropdownRef, setDropdownRef] = useState("")
    const dropdownContainer = useRef(null)
    const [transformX, setTransformX] = useState(0)
    const [dropdownId, setDropdownId] = useState(0)
    const lastSelectionId = useRef(0)
    const lastDirection = useRef(0)
    const [currentDirection, setCurrentDirection] = useState(0)
    const handleHover = (id) => {
        setSelection(menuItems.find(item => item.id === id))
    }

    const getCorrectTranslation = (id) => {

        console.log(id, lastSelectionId.current)
        const direction = id > lastSelectionId.current ? "right" : "left"
        return direction
    }

    useEffect(() => {
        if (selection && dropdownRef) {
            const transformAmount = currentRef.getBoundingClientRect().x +
                currentRef.getBoundingClientRect().width - firstRef.getBoundingClientRect().x
            if (dropdownId !== 0) {

                const direction = getCorrectTranslation(dropdownId)
                setCurrentDirection(direction)
                const translation = dropdownRef.offsetWidth
                let correctTranslation;
                correctTranslation = direction === "right" ? translation : -translation
                console.table(currentDirection, lastDirection.current)

                if (dropdownId === menuItems[0].id || dropdownId === menuItems[menuItems.length - 1].id) {
                    correctTranslation = -correctTranslation

                    console.log("extremoou")
                } else {
                    if (currentDirection !== lastDirection.current) {
                        correctTranslation = -correctTranslation
                    }
                }

                setTransformX(correctTranslation)
                setDimensions({
                    height: dropdownRef.offsetHeight,
                    width: dropdownRef.offsetWidth,
                    transform: `translateX(${transformAmount}px)`
                })
            }

        }
    }, [dropdownRef, currentDirection])



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
                    style={{ position: "absolute", height, width, transform, background: "lightblue", transition: "all 0.3s ease", overflow: "hidden", zIndex: "-20" }}
                    ref={dropdownContainer}
                    onTransitionEnd={() => {
                        lastDirection.current = currentDirection;
                        lastSelectionId.current = dropdownId
                    }}
                >
                    {menuItems && menuItems.map(item => (
                        <Transition
                            in={selection.id === item.id}
                            timeout={timeout}
                            unmountOnExit
                            mountOnEnter

                        >{
                                state => (
                                    <Dropdown
                                        state={state}
                                        info={item}
                                        selection={selection}
                                        setDropdownRef={setDropdownRef}
                                        setSelection={setSelection}
                                        translateX={transformX}
                                        setDropdownId={setDropdownId}
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

