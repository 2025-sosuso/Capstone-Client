import SideBarItem from "@components/layout/sidebar/SideBarItem";
import {SideBarItems} from "@components/layout/sidebar/side-bar-config";

interface SideBarProps {
    isOpen: boolean;
}

const SideBar = ({isOpen} : SideBarProps) => {
    return (
        <div
            className={`h-[calc(100vh-48px)] bg-white transition-all duration-300 overflow-hidden 
            ${isOpen ? 'w-64' : 'w-0'} shrink-0`}
        >
            <div className="flex flex-col h-full p-5 whitespace-nowrap justify-between">
                    <div className="flex flex-col">
                        {SideBarItems.map((item, i) => (
                            <SideBarItem key={i}
                                         name={item.name}
                                         emoji={item.emoji}
                                         icon={item.icon}
                                         href={item.href}
                                         action={item.action}
                            />
                        ))}
                </div>
            </div>
        </div>
    );

}

export default SideBar;