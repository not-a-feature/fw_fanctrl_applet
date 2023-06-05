const Applet = imports.ui.applet;
const Lang = imports.lang;
const PopupMenu = imports.ui.popupMenu;
const St = imports.gi.St;
const Util = imports.misc.util;
const UUID = "fw_fanctrl@juleskreuer.eu";

const STRATEGY = {
    'Lazyest': ['lazyest', 'weather-clear-night'],
    'Lazy': ['lazy', 'weather-clear-night'],
    'Medium': ['medium', 'computer'],
    'Agile': ['agile', 'computer'],
    'Deaf': ['deaf', 'weather-windy'],
    'Aeolus': ['aeolus', 'weather-windy'],
};

class FW_CONTROL extends Applet.TextIconApplet {
    constructor(metadata, orientation, panel_height, instance_id) {
        super(orientation, panel_height, instance_id);
        //this.set_applet_label("Menus");
        this.set_applet_icon_symbolic_name('image-filter');
        //this.set_applet_icon_symbolic_name('node-segment-curve');
        this.set_applet_tooltip("Framework Fan Strategy Control");

        /**
         * Menu Manager and Menu
         */

        this.menuManager = new PopupMenu.PopupMenuManager(this);
        this.menu = new Applet.AppletPopupMenu(this, orientation);
        this.menuManager.addMenu(this.menu);
        let titleItem = new PopupMenu.PopupMenuItem('Select fan strategy', { reactive: false });
        this.menu.addMenuItem(titleItem);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        for (let label in STRATEGY) {
            let menuItem = new PopupMenu.PopupIconMenuItem(label, STRATEGY[label][1], St.IconType.SYMBOLIC);
            menuItem.connect('activate', () => {
                this.activateStrategy(STRATEGY[label][0]);
            });
            this.menu.addMenuItem(menuItem);
        }

    }

    on_applet_clicked() {
        this.menu.toggle();
    }

    activateStrategy(strategy) {
        Util.spawnCommandLine("fw-fanctrl " + strategy);
        this.menu.close();
    }
}

function main(metadata, orientation, panel_height, instance_id) {
    return new FW_CONTROL(metadata, orientation, panel_height, instance_id);
}