'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTasks, FaRegCheckSquare, FaRegClock } from "react-icons/fa";

export default function TopMenu() {
  const pathname = usePathname();

  const navList = [
    { id: 1, label: "All Tasks", link: "/", icon: <FaTasks className="size-4 shrink-0" /> },
    { id: 2, label: "Completed", link: "/completed", icon: <FaRegCheckSquare className="size-4 shrink-0" /> },
    { id: 3, label: "Expired", link: "/expired", icon: <FaRegClock className="size-4 shrink-0" /> },
  ];

  return (
    <div className="w-full bg-gray-800 text-white sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">UniDue Next</h1>
      </div>

      <nav className="px-2 pb-2">
        <ul className="flex items-stretch gap-2 overflow-x-auto no-scrollbar">
          {navList.map((item) => {
            const active = pathname === item.link;
            return (
              <li key={item.id} className="shrink-0">
                <Link
                  href={item.link}
                  className={[
                    "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-gray-700 ring-1 ring-gray-600"
                      : "hover:bg-gray-700/80 ring-1 ring-transparent",
                  ].join(" ")}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
