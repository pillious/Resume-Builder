import { List } from "@mui/material";
import { Reorder, useDragControls } from "framer-motion";
import { guid, IItem } from "../../../types";
import Item from "./Item";

interface IProps {
    items: IItem[];
    experienceId: guid;
    sectionId: guid;
    areToolsActive: boolean;
    updateItemContent: (
        sectionId: guid,
        experienceId: guid,
        itemId: guid,
        content: string
    ) => void;
    updateItemOrder: (
        sectionId: guid,
        experienceId: guid,
        order: guid[]
    ) => void;
    deleteItem: (sectionId: guid, experienceId: guid, itemId: guid) => void;
}

const ExperienceList: React.FC<IProps> = (props) => {
    const controls = useDragControls();

    return (
        <List sx={{ p: "1rem" }}>
            <Reorder.Group
                axis="y"
                values={props.items.map((i) => i.id)}
                style={{ padding: 0 }}
                onReorder={(order: guid[]) =>
                    props.updateItemOrder(
                        props.sectionId,
                        props.experienceId,
                        order
                    )
                }
            >
                {props.items.map((item) => (
                    <Reorder.Item
                        key={item.id}
                        value={item.id}
                        style={{
                            listStyle: "none",
                        }}
                        dragListener={false}
                        dragControls={controls}
                    >
                        <Item
                            key={item.id}
                            item={item}
                            sectionId={props.sectionId}
                            experienceId={props.experienceId}
                            updateItemContent={props.updateItemContent}
                            deleteItem={props.deleteItem}
                            dragControls={controls}
                            areToolsActive={props.areToolsActive}
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </List>
    );
};

export default ExperienceList;
