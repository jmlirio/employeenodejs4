import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import './App.css'

const UserCircle = ({ user }) => {
    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>{user? user.EmployeeID: 'id'} {user? user.FirstName: 'name'} {user? user.LastName: 'lastname'}</Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="top" overlay={popover}>
<div className="user-circle">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 8v4l3 3"></path>
    <path d="M12 8v4l-3 3"></path>
  </svg>
</div>

        </OverlayTrigger>
    );
};

export default UserCircle;
