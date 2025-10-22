import HeaderSearch from "@components/layout/header/HeaderSearch";
import Logo from "@components/layout/header/Logo";
import SideBarToggleButton from "@components/layout/header/SideBarToggleButton";
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