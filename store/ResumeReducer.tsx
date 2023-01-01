import { IFile, IHeader, ISection, IExperience, IItem, guid } from "../custom2";

type ACTIONTYPE =
    | { type: "setResume"; payload: IFile | null }
    | { type: "addHeaderInfo"; payload: { itemId: guid; content: string } }
    | { type: "addSection"; payload: { sectionId: guid; name: string } }
    | {
          type: "addExperience";
          payload: { sectionId: guid; experienceId: guid; name: string };
      }
    | {
          type: "addItem";
          payload: {
              sectionId: guid;
              experienceId: guid;
              itemId: guid;
              content: string;
          };
      }
    | { type: "updateHeaderName"; payload: { name: string } }
    | { type: "updateHeaderInfo"; payload: { itemId: guid; content: string } }
    | { type: "updateSectionName"; payload: { sectionId: guid; name: string } }
    | { type: "updateSectionOrder"; payload: { order: guid[] } }
    | { type: "updateHeaderOrder"; payload: { itemId: guid; order: number } }
    | {
          type: "updateExperienceName";
          payload: { sectionId: guid; experienceId: guid; name: string };
      }
    | {
          type: "updateExperienceDate";
          payload: {
              sectionId: guid;
              experienceId: guid;
              isStartDate: boolean;
              date: string;
          };
      }
    | {
          type: "updateExperienceOrder";
          payload: { sectionId: guid; experienceId: guid; order: guid[] };
      }
    | {
          type: "updateItemContent";
          payload: {
              sectionId: guid;
              experienceId: guid;
              itemId: guid;
              content: string;
          };
      }
    | {
          type: "updateItemOrder";
          payload: {
              sectionId: guid;
              experienceId: guid;
              order: guid[];
          };
      }
    | { type: "deleteHeaderInfo"; payload: guid }
    | { type: "deleteSection"; payload: guid }
    | {
          type: "deleteExperience";
          payload: { sectionId: guid; experienceId: guid };
      }
    | {
          type: "deleteItem";
          payload: { sectionId: guid; experienceId: guid; itemId: guid };
      };

const resumeReducer = (
    state: IFile | null,
    action: ACTIONTYPE
): IFile | null => {
    // "setResume" can still occur even if previous state is null.
    if (action.type === "setResume") {
        return action.payload;
    } else if (state !== null) {
        switch (action.type) {
            case "addHeaderInfo": {
                const header: IHeader = JSON.parse(
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
                const sections = JSON.parse(JSON.stringify(state.sections));

                const newSection: ISection = {
                    id: action.payload.sectionId,
                    name: action.payload.name,
                    items: [],
                    order: sections.length,
                };

                return { ...state, sections: [...sections, newSection] };
            }
            case "addExperience": {
                const secIdx = state.sections.findIndex(
                    (section) => section.id === action.payload.sectionId
                );
                if (secIdx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );

                const newExperience: IExperience = {
                    name: action.payload.name,
                    id: action.payload.experienceId,
                    items: [],
                    sectionId: action.payload.sectionId,
                    startDate: "",
                    endDate: "",
                    order: sections[secIdx].items.length,
                };

                sections[secIdx].items.push(newExperience);

                return { ...state, sections };
            }
            case "addItem": {
                const secIdx = state.sections.findIndex(
                    (section) => section.id === action.payload.sectionId
                );
                if (secIdx === -1) return state;

                const expIdx = state.sections[secIdx].items.findIndex(
                    (exp) => exp.id === action.payload.experienceId
                );
                if (expIdx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );
                const experiences: IExperience[] = JSON.parse(
                    JSON.stringify(sections[secIdx].items)
                );

                experiences[expIdx].items.push({
                    content: action.payload.content,
                    order: experiences[expIdx].items.length,
                    id: action.payload.itemId,
                });
                sections[secIdx].items = experiences;

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
                const header: IHeader = JSON.parse(
                    JSON.stringify(state.header)
                );
                const item = header.items.find(
                    (i) => i.id === action.payload.itemId
                );

                if (!item) return state;

                item.content = action.payload.content;

                return { ...state, header };
            }
            case "updateSectionName": {
                const secIdx = state.sections.findIndex(
                    (section) => section.id === action.payload.sectionId
                );
                if (secIdx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );

                sections[secIdx].name = action.payload.name;

                return { ...state, sections };
            }
            case "updateSectionOrder": {
                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );

                const updatedSections: ISection[] = action.payload.order.map(
                    (id, idx) => {
                        const section = sections.find((s) => s.id === id);
                        if (section) {
                            section.order = idx;
                            return section;
                        }

                        // shouldn't ever reach this.
                        return sections[0];
                    }
                );

                return { ...state, sections: updatedSections };
            }
            case "updateExperienceName": {
                const secIdx = state.sections.findIndex(
                    (section) => section.id === action.payload.sectionId
                );
                if (secIdx === -1) return state;

                const expIdx = state.sections[secIdx].items.findIndex(
                    (exp) => exp.id === action.payload.experienceId
                );
                if (expIdx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );
                const experiences: IExperience[] = JSON.parse(
                    JSON.stringify(sections[secIdx].items)
                );

                experiences[expIdx].name = action.payload.name;
                sections[secIdx].items = experiences;

                return { ...state, sections };
            }
            case "updateExperienceDate": {
                const secIdx = state.sections.findIndex(
                    (section) => section.id === action.payload.sectionId
                );
                if (secIdx === -1) return state;

                const expIdx = state.sections[secIdx].items.findIndex(
                    (exp) => exp.id === action.payload.experienceId
                );
                if (expIdx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );
                const experiences: IExperience[] = JSON.parse(
                    JSON.stringify(sections[secIdx].items)
                );

                if (action.payload.isStartDate)
                    experiences[expIdx].startDate = action.payload.date;
                else experiences[expIdx].endDate = action.payload.date;

                sections[secIdx].items = experiences;

                return { ...state, sections };
            }
            case "updateExperienceOrder": {
                return state;
                // TODO
            }
            case "updateItemContent": {
                const secIdx = state.sections.findIndex(
                    (section) => section.id === action.payload.sectionId
                );
                if (secIdx === -1) return state;

                const expIdx = state.sections[secIdx].items.findIndex(
                    (exp) => exp.id === action.payload.experienceId
                );
                if (expIdx === -1) return state;

                const itemIdx = state.sections[secIdx].items[
                    expIdx
                ].items.findIndex((item) => item.id === action.payload.itemId);
                if (itemIdx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );
                const experiences: IExperience[] = JSON.parse(
                    JSON.stringify(sections[secIdx].items)
                );
                const items: IItem[] = JSON.parse(
                    JSON.stringify(state.sections[secIdx].items[expIdx].items)
                );

                items[itemIdx].content = action.payload.content;
                experiences[expIdx].items = items;
                sections[secIdx].items = experiences;

                return { ...state, sections };
            }
            case "updateItemOrder": {
                const secIdx = state.sections.findIndex(
                    (section) => section.id === action.payload.sectionId
                );
                if (secIdx === -1) return state;

                const expIdx = state.sections[secIdx].items.findIndex(
                    (exp) => exp.id === action.payload.experienceId
                );
                if (expIdx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );
                const experiences: IExperience[] = JSON.parse(
                    JSON.stringify(sections[secIdx].items)
                );
                const items: IItem[] = JSON.parse(
                    JSON.stringify(state.sections[secIdx].items[expIdx].items)
                );

                const updatedItems: IItem[] = action.payload.order.map(
                    (id, idx) => {
                        const item = items.find((i) => i.id === id);
                        if (item) {
                            item.order = idx;
                            return item;
                        }

                        // shouldn't ever reach this.
                        return items[0];
                    }
                );

                experiences[expIdx].items = updatedItems;
                sections[secIdx].items = experiences;

                return { ...state, sections };
            }
            case "deleteHeaderInfo": {
                const header: IHeader = JSON.parse(
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
                const secIdx = state.sections.findIndex(
                    (section) => section.id === action.payload
                );
                if (secIdx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );

                sections.splice(secIdx, 1);

                return { ...state, sections };
            }
            case "deleteExperience": {
                const secIdx = state.sections.findIndex(
                    (section) => section.id === action.payload.sectionId
                );
                if (secIdx === -1) return state;

                const expIdx = state.sections[secIdx].items.findIndex(
                    (exp) => exp.id === action.payload.experienceId
                );
                if (expIdx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );
                const experiences: IExperience[] = JSON.parse(
                    JSON.stringify(sections[secIdx].items)
                );

                experiences.splice(expIdx, 1);
                sections[secIdx].items = experiences;

                return { ...state, sections };
            }
            case "deleteItem": {
                const secIdx = state.sections.findIndex(
                    (section) => section.id === action.payload.sectionId
                );
                if (secIdx === -1) return state;

                const expIdx = state.sections[secIdx].items.findIndex(
                    (exp) => exp.id === action.payload.experienceId
                );
                if (expIdx === -1) return state;

                const itemIdx = state.sections[secIdx].items[
                    expIdx
                ].items.findIndex((item) => item.id === action.payload.itemId);
                if (itemIdx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );
                const experiences: IExperience[] = JSON.parse(
                    JSON.stringify(sections[secIdx].items)
                );
                const items: IItem[] = JSON.parse(
                    JSON.stringify(state.sections[secIdx].items[expIdx].items)
                );

                items.splice(itemIdx, 1);
                experiences[expIdx].items = items;
                sections[secIdx].items = experiences;

                return { ...state, sections };
            }
        }
    }

    return state;
};

export default resumeReducer;
