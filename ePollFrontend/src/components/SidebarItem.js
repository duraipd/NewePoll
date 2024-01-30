import { useState } from "react";
 
export default function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);
 
  const toggleOpen = () => {
    setOpen(!open);
  };
 
  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title" onClick={toggleOpen}>
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i className="sidebar-item.open > .sidebar-title .toggle-btn" onClick={toggleOpen}></i>
        </div>
        <div className="sidebar-content">
          {open &&
            item.childrens.map((child, index) => (
              <SidebarItem key={index} item={child} />
            ))}
        </div>
      </div>
    );
  } else {
    return (
      <a href={item.path || "#"} className="sidebar-item plain">
        {item.icon && <i className={item.icon}></i>}
        {item.title}
      </a>
    );
  }
}