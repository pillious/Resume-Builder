import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DebouncedTextarea from "../../UI/DebouncedTextarea";
import { guid, IItem } from "../../../custom2";
import classes from "./Item.module.css";

interface IProps {
    item: IItem;
    sectionId: string;
    updateItemContent: (sectionId: guid, itemId: guid, content: string) => void;
    deleteItem: (sectionId: guid, itemId: guid) => void;
}

const Item: React.FC<IProps> = (props) => {
    return (
        <div className={classes.list_item_wrapper}>
            <ListItem
                sx={[
                    {
                        "&:hover": {
                            backgroundColor: "#eee",
                        },
                    },
                ]}
                className={classes.list_item}
                disablePadding
            >
                <DebouncedTextarea
                    sx={{ width: "100%" }}
                    defaultValue={props.item.content}
                    placeholder="Type here. . ."
                    onChange={(content) => {
                        props.updateItemContent(
                            props.sectionId,
                            props.item.id,
                            content
                        );
                    }}
                />
            </ListItem>
            <ListItemIcon
                sx={{ color: "#000", minWidth: "unset" }}
                className={classes.list_style}
                onClick={() => props.deleteItem(props.sectionId, props.item.id)}
            ></ListItemIcon>
        </div>
    );
};

export default Item;
