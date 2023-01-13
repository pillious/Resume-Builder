import { useTheme } from '@mui/material';
import DebouncedTextarea from "../../UI/DebouncedTextarea";

interface IProps {
    placeholder?: string;
    defaultValue?: string;
    onChange: (content: string) => void;
}

const Info: React.FC<IProps> = (props) => {
    const theme = useTheme();

    return (
        <DebouncedTextarea
            sx={{
                mr: 0.5,
                borderBottom: `1px solid ${theme.palette.divider}`,
                fontSize: "0.9rem",
                width: "max(75px, 18%)",
                "&:hover": {
                    backgroundColor: theme.palette.overlay,
                },
                "& input": { textAlign: "center" },
            }}
            defaultValue={props.defaultValue ?? ""}
            placeholder={props.placeholder ?? ""}
            multiline={false}
            onChange={(content) => props.onChange(content)}
        />
    );
};

export default Info;
