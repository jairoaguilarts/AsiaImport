import React, { useState } from 'react';
import { Container, Button, Collapse } from 'react-bootstrap';
import './SideBarMenu.css';

const sideBarMenu = () => {
    const[open, setOpen] = useState(false);

    return (
        <Container fluid>
            <Button onClick={() => setOpen(!open)} aria-controls='sidebar' aria-expanded={open}>
                &#9776; Menu
            </Button>
            <Collapse in={open}>
                <div>
                    <a href="#" className="d-block p-3">Opción 1</a>
                    <a href="#" className="d-block p-3">Opción 2</a>
                    <a href="#" className="d-block p-3">Opción 3</a>
                </div>
            </Collapse>
        </Container>
    )
}