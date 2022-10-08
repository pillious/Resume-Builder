import { IFile, ISection, IItem, guid } from "../custom2";

type ACTIONTYPE =
    | { type: "setResume"; payload: IFile | null }
    | { type: "addHeaderInfo"; payload: { itemId: guid; content: string } }
    | { type: "addSection"; payload: { sectionId: guid; name: string } }
    | {
          type: "addItem";
          payload: { sectionId: guid; itemId: guid; content: string };
      }
    | { type: "updateHeaderName"; payload: { name: string } }
    | { type: "updateHeaderInfo"; payload: { itemId: guid; content: string } }
    | { type: "updateHeaderOrder"; payload: { itemId: guid; order: number } }
    | { type: "updateSectionName"; payload: { sectionId: guid; name: string } }
    | {
          type: "updateSectionOrder";
          payload: { sectionId: guid; order: number };
      }
    | {
          type: "updateItemContent";
          payload: { sectionId: guid; itemId: guid; content: string };
      }
    | {
          type: "updateItemOrder";
          payload: { sectionId: guid; itemId: guid; order: number };
      }
    | { type: "deleteHeaderInfo"; payload: guid }
    | { type: "deleteSection"; payload: string }
    | { type: "deleteItem"; payload: { sectionId: guid; itemId: guid } };

const resumeReducer = (
    state: IFile | null,
    action: ACTIONTYPE
): IFile | null => {
    // "setResume" can still occur even if previous state is null.
    if (action.type === "setResume") {
        return action.payload;
    } else if (state != null) {
        switch (action.type) {
            case "addHeaderInfo": {
                const header: ISection = JSON.parse(
                    JSON.stringify(state.header)
                );
                header.items.push({
                    content: action.payload.content,
                    order: state.header.items.length,
                    id: action.payload.itemId,
                });

                return { ...state, header };
            }
            case "addSection": {
                const newSection: ISection = {
                    name: action.payload.name,
                    id: action.payload.sectionId,
                    items: [],
                };
                return { ...state, sections: [...state.sections, newSection] };
            }
            case "addItem": {
                const idx = state.sections.findIndex(
                    (section) => section.id === action.payload.sectionId
                );
                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );
                sections[idx].items.push({
                    content: action.payload.content,
                    order: sections[idx].items.length,
                    id: action.payload.itemId,
                });
                return { ...state, sections };
            }
            case "updateHeaderName": {
                const updatedState = {
                    ...state,
                    header: { ...state.header },
                };
                updatedState.header.name = action.payload.name;
                return updatedState;
            }
            case "updateHeaderInfo": {
                const header: ISection = JSON.parse(
                    JSON.stringify(state.header)
                );
                const item = header.items.find(
                    (i) => i.id === action.payload.itemId
                );

                if (!item) return state;

                item.content = action.payload.content;

                const updatedState = {
                    ...state,
                    header,
                };

                return updatedState;
            }
            case "updateSectionName": {
                const sectionIdx = state.sections.findIndex(
                    (s) => s.id === action.payload.sectionId
                );
                if (sectionIdx === -1) return state;

                const section: ISection = JSON.parse(
                    JSON.stringify(state.sections[sectionIdx])
                );
                section.name = action.payload.name;

                const updatedState = {
                    ...state,
                    sections: [...state.sections],
                };
                updatedState.sections[sectionIdx] = section;

                return updatedState;
            }
            case "updateItemContent": {
                const sectionIdx = state.sections.findIndex(
                    (s) => s.id === action.payload.sectionId
                );

                if (sectionIdx === -1) return state;

                const items: IItem[] = JSON.parse(
                    JSON.stringify(state.sections[sectionIdx].items)
                );
                const item = items.find((i) => i.id === action.payload.itemId);

                if (!item) return state;

                item.content = action.payload.content;

                const updatedState = {
                    ...state,
                    sections: [...state.sections],
                };
                updatedState.sections[sectionIdx].items = items;

                return updatedState;
            }
            case "deleteHeaderInfo": {
                const header: ISection = JSON.parse(
                    JSON.stringify(state.header)
                );
                const idx = header.items.findIndex(
                    (i) => i.id === action.payload
                );

                if (idx === -1) return state;

                header.items.splice(idx, 1);

                return { ...state, header };
            }
            case "deleteSection": {
                const idx = state.sections.findIndex(
                    (s) => s.id === action.payload
                );

                if (idx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );
                sections.splice(idx, 1);

                return { ...state, sections };
            }
            case "deleteItem": {
                const sectionIdx = state.sections.findIndex(
                    (s) => s.id === action.payload.sectionId
                );

                if (sectionIdx === -1) return state;

                const itemIdx = state.sections[sectionIdx].items.findIndex(
                    (i) => i.id === action.payload.itemId
                );

                if (itemIdx === -1) return state;

                const items = JSON.parse(
                    JSON.stringify(state.sections[sectionIdx].items)
                );
                items.splice(itemIdx, 1);

                const updatedState = {
                    ...state,
                    sections: [...state.sections],
                };
                updatedState.sections[sectionIdx].items = items;

                return updatedState;
            }
        }
    }

    return state;
};

export default resumeReducer;
