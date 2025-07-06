import { resetNotes } from "../../store/notesSlice";
import Calculator from "./Calculator";
import ChitramitraSocialApp from "./ChitramitraSocialApp";
import ClockApp from "./ClockApp";
import CodeLab from "./CodeLab";
import MyPortfolio from "./MyPortfolio";
import Notes from "./Notes";
import Paint from "./Paint";
import SavedNotes from "./SavedNotes";
import SolarSystem from "./SolarSystem";
import SpaceGame from "./SpaceGame";
import Terminal from "./Terminal";
import WallpaperApp from "./WallpaperApp";

export const appsConfig = {
  notes: {
    title: "Notes",
    component: Notes,
    onCloseExtra: (dispatch) => dispatch(resetNotes()),
  },
  clock: {
    title: "Clock",
    component: ClockApp,
  },
  paint: {
    title: "Paint",
    component: Paint,
  },
  calculator: {
    title: "Calculator",
    component: Calculator,
  },
  space_explorer_game: {
    title: "Space Explorer Game",
    component: SpaceGame,
  },
  portfolio: {
    title: "My Portfolio",
    component: MyPortfolio,
  },
  react_code_editor: {
    title: "React Code Editor",
    component: CodeLab,
  },
  chitramitra: {
    title: "ChitraMitra - Social App",
    component: ChitramitraSocialApp,
  },
  solar_system: {
    title: "Solar System",
    component: SolarSystem,
  },
  saved_notes: {
    title: "Saved Notes",
    component: SavedNotes,
  },
  terminal: {
    title: "Fake Terminal",
    component: Terminal,
  },
  wallpaper: {
    title: "Wallpaper",
    component: WallpaperApp,
  },
};
