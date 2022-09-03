import React from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import classes from "./Section.module.css";
import AddListItem from "./AddListItem";
import Textarea from "../UI/Textarea";
import { IItem, guid } from "../../custom2";
import Item from "./Item";

interface IProps {
    id: guid;
    title: string;
    items: IItem[];
    addItem: (sectionId: guid) => void;
    updateSectionName: (sectionId: guid, name: string) => void;
    updateItemContent: (sectionId: guid, itemId: guid, content: string) => void;
    deleteItem: (sectionId: guid, itemId: guid) => void;
    deleteSection: (sectionId: guid) => void;
}

const Section: React.FC<IProps> = (props) => {
    return (
        <Card elevation={0} className={classes.Card}>
            <div className={classes.top}>
                <Textarea
                    sx={{
                        fontSize: "1.5rem",
                        width: "max-content",
                        fontWeight: 600,
                    }}
                    defaultValue={props.title}
                    placeholder="Give me a title..."
                    multiline={false}
                    onChange={(name) => props.updateSectionName(props.id, name)}
                />
                <DeleteOutlineIcon
                    sx={{
                        color: "#ff0000",
                        "&:hover": {
                            transform: "scale(1.25)",
                            cursor: "pointer",
                        },
                        transition: "200ms",
                    }}
                    onClick={() => {
                        props.deleteSection(props.id);
                    }}
                />
                <AddListItem addItem={() => props.addItem(props.id)} />
            </div>
            {props.items.length > 0 && (
                <Card elevation={2}>
                    <List className={classes.List}>
                        {props.items.map((item) => (
                            <Item
                                key={item.id}
                                item={item}
                                sectionId={props.id}
                                updateItemContent={props.updateItemContent}
                                deleteItem={props.deleteItem}
                            />
                        ))}
                    </List>
                </Card>
            )}
        </Card>
    );
};

export default Section;
