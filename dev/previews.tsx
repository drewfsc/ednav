import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import RootLayout from "@/app/layout";
import ClientTable from "@/components/ClientTable";
import LeftNavigation from "@/components/LeftNavigation";

interface ComponentPreviewsProps {
    children: React.ReactNode
}

const ComponentPreviews = ({children}: ComponentPreviewsProps) => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/RootLayout">
                <RootLayout children={children}/>
            </ComponentPreview>
            <ComponentPreview path="/ClientTable">
                <ClientTable/>
            </ComponentPreview>
            <ComponentPreview path="/LeftNavigation">
                <LeftNavigation/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
