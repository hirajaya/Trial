import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { LuPackage } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

const AdminPanel = () => {
    return (
        <div className="flex w-full h-screen bg-gray-100">
            <nav style={{ width: "15%" }} className="bg-white border-r">
                <div className="font-bold text-2xl m-5 mt-10">Logo</div>
                <ul className="mt-20">
                    <li className="m-5 font-medium text-gray-700 flex items-center">
                        <FiHome className="mr-2" />
                        <NavLink 
                            to="/admin/dashboard" 
                            className={({ isActive }) => 
                                isActive ? "text-gray-900 font-bold" : "text-gray-700"
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="m-5 font-medium text-gray-700 flex items-center">
                        <LuPackage className="mr-2" />
                        <NavLink 
                            to="/admin/manage-products" 
                            className={({ isActive }) => 
                                isActive ? "text-gray-900 font-bold" : "text-gray-700"
                            }
                        >
                            Manage Products
                        </NavLink>
                    </li>
                    <li className="m-5 font-medium text-gray-700 flex items-center">
                        <IoSettingsOutline className="mr-2" />
                        <NavLink 
                            to="/admin/settings" 
                            className={({ isActive }) => 
                                isActive ? "text-gray-900 font-bold" : "text-gray-700"
                            }
                        >
                            Settings
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div style={{ width: "85%" }} className="">
                <Outlet /> {/* Render the nested route's content here */}
            </div>
        </div>
    );
};

export default AdminPanel;
