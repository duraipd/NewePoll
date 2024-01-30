import SidebarItem from "./SidebarItem"
import items from "../datajson/sidebar.json"
 
 
export default function Sidebar(){
    return (
        <div className="sidebar">
          { items.map((item, index) => <SidebarItem key={index} item={item} />) }
        </div>
    )
}
 