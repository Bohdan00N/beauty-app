import React, { useState } from 'react'
import './index.css'
import { SidebarAdmin } from "./sidebarAdmin";
export const History = () => {
    const [stateModal, setStateModal] = useState(false);
  
  return (
    <div className='categCont'><button
            className="btnmodalswitch"
            onClick={() => setStateModal(!stateModal)}
          ></button>
          <div
            className={`sidebar ${
              stateModal === true ? "sidebar-opened" : "sidebar-closed"
            }`}
          >
            {" "}
            <SidebarAdmin/>
          </div></div>
  )
}
