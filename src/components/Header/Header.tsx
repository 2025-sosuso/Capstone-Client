import HeaderSearch from "@components/Header/HeaderSearch";
import Logo from "@components/Header/Logo";
import SideBarToggleButton from "@components/Header/SideBarToggleButton";
import {useIsNarrow} from "@/hooks/useIsNarrow";

export default function Header({ toggleAction }: { toggleAction: () => void }) {
    const isNarrow = useIsNarrow();

    return (
        <header className="flex items-center px-5 py-2 gap-5 bg-white w-full h-[48px]">
            <SideBarToggleButton toggleAction={toggleAction}/>
            {isNarrow ? <Logo isMini={true}/> : <Logo/>}
            <div className="flex w-full justify-end sm:ml-5 sm:justify-center">
                <HeaderSearch isNarrow={isNarrow} />
            </div>
        </header>
    );
}