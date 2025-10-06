import {FaTasks, FaRegCheckSquare, FaRegClock} from "react-icons/fa";
import NavItem from "./NavItem/NavItem";
export default function NavList() {
    const navList = [
        {id:1, label: 'All Tasks', link: "/", icon: <FaTasks className="size-5"/>},
        {id:2, label: 'Completed Tasks', link: "/completed", icon: <FaRegCheckSquare className="size-5"/>},
        {id:3, label: 'Expired Tasks', link: "/expired", icon: <FaRegClock className="size-5"/>}
    ]
  return (
    <div className="mt-24">
        {navList.map(item => {
            return <NavItem key={item.id} label={item.label} link={item.link} icon={item.icon}/>
        })}
    </div>
  )
}
