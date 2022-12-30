import { Toolbar } from "@mui/material";

interface IProps {
    fileName: string;
    copy: () => void;
    save: () => void;
    download: () => void;
    preview: () => void;
    rename: (name: string) => void;
    delete: () => void;
}

const Toolbox: React.FC<IProps> = (props) => {
    return (
        <Toolbar>
            <div>File</div>
            <div>Format icon</div>
            <div>Preview & icon</div>
            <div>undo/redo</div>
        </Toolbar>
    );
};

export default Toolbox;
