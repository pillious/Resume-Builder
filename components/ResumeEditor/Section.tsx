import React from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import classes from "./Section.module.css";
import AddListItem from "./AddListItem";
// import Input from "@mui/material/Input";
import Textarea from "../UI/Textarea";
// import MyInput from "../UI/Input";

interface IProps {
    id: string;
    title: string;
    items: string[];
    addItem: (sectionId: string) => void;
    deleteItem: (sectionId: string, itemIdx: number) => void;
    deleteSection: (sectionId: string) => void;
}

const Section: React.FC<IProps> = (props) => {
    return (
        <Card elevation={0} className={classes.Card}>
            <div className={classes.top}>
                <h1 className={classes.title}>{props.title}</h1>
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
                        {props.items.map((item, idx) => (
                            <div
                                key={idx}
                                className={classes.list_item_wrapper}
                            >
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
                                    <Textarea
                                        sx={{ width: "100%" }}
                                        defaultValue={item}
                                        placeholder="Type here. . ."
                                    />
                                </ListItem>
                                <ListItemIcon
                                    sx={{ color: "#000", minWidth: "unset" }}
                                    className={classes.list_style}
                                    onClick={() =>
                                        props.deleteItem(props.id, idx)
                                    }
                                ></ListItemIcon>
                            </div>
                        ))}
                    </List>
                </Card>
            )}

            {/* <MyInput /> */}
        </Card>
    );
};

export default Section;
