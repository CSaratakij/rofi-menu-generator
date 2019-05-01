/* View Factory */
function createMenuEntryView(number) {
    let template = document.getElementsByTagName("template")[0];
    let item = template.content.querySelector("tr");

    let node = document.importNode(item, true);
    node.id = "menu-" + number

    return node;
}

/* View Logic */
function addMenuEntry(menuName, command) {
    let menuList = document.getElementById("menu-list");
    let menuEntry = menuList.getElementsByTagName("tr");
    let view = createMenuEntryView(menuEntry.length + 1);

    menuList.appendChild(view);
    reArrangeMenuEntry();
}

function removeMenuEntry(number) {
    let target = document.getElementById("menu-" + number);
    target.parentNode.removeChild(target);
    reArrangeMenuEntry();
}

function reArrangeMenuEntry() {
    let menuList = document.getElementById("menu-list");
    let menuEntry = menuList.getElementsByTagName("tr");
    let i = 0;

    for (i = 0; i < menuEntry.length; i++)
    {
        let number = (i + 1);
        let thElements = menuEntry[i].getElementsByTagName("th");

        menuEntry[i].id = "menu-" + number;
        thElements[0].innerHTML = number;

        if (thElements[1] == undefined)
            return;

        let buttons = thElements[1].getElementsByTagName("a");
        buttons[0].onclick = function() {
            removeMenuEntry(number);
        }
    }
}

function sortMenuEntry() {
    let menu = getMenuInfo(false);
    let trimEntry = menu.entryList.filter(obj => (obj.name !== undefined) && (obj.name !== ""));

    trimEntry.sort(
        function compare(a, b) {
            const appNameA = a.name.toUpperCase();
            const appNameB = b.name.toUpperCase();

            let comparision = 0;

            if (appNameA > appNameB) {
                comparision = 1;
            }
            else if (appNameA < appNameB) {
                comparision = -1;
            }

            return comparision;
        }
    );

    setMenuEntryViews(trimEntry);
}

function setMenuEntryViews(entryList) {
    let menuList = document.getElementById("menu-list");
    let menuEntry = menuList.getElementsByTagName("tr");
    let i = 0;

    for (i = 0; i < menuEntry.length; i++)
    {
        let tdElements = menuEntry[i].getElementsByTagName("td");

        if (tdElements[0] == undefined || tdElements[1] == undefined) {
            return;
        }

        let inputsA = tdElements[0].getElementsByTagName("input");
        let inputsB = tdElements[1].getElementsByTagName("input");

        if (entryList[i] == undefined) {
            inputsA[0].value = "";
            inputsB[0].value = "";
        }
        else {
            inputsA[0].value = entryList[i].name;
            inputsB[0].value = entryList[i].command;
        }
    }
}

/* View Model */
function getMenuInfo(isAutoSubstitute = true) {
    let menu = new Object();

    menu.title = document.getElementById("menuTitle").value;
    menu.fontName = document.getElementById("menuFont").value;
    menu.fontSize = document.getElementById("menuFontSize").value;
    menu.entryList = [];

    let menuList = document.getElementById("menu-list");
    let menuEntry = menuList.getElementsByTagName("tr");
    let i = 0;

    for (i = 0; i < menuEntry.length; i++)
    {
        let tdElements = menuEntry[i].getElementsByTagName("td");

        if (tdElements[0] == undefined || tdElements[1] == undefined) {
            return;
        }

        let inputsA = tdElements[0].getElementsByTagName("input");
        let inputsB = tdElements[1].getElementsByTagName("input");

        if (inputsA[0].value == undefined || inputsB[0].value == undefined) {
            continue;
        }

        let entryName = inputsA[0].value;
        let entryCommand = inputsB[0].value;

        let entry = new Object();

        if (isAutoSubstitute) {
            entry.name = (entryName == "") ? "Entry" + (i + 1) : entryName;
            entry.command = (entryCommand == "") ? "command" : entryCommand;
        }
        else {
            entry.name = entryName;
            entry.command = entryCommand;
        }

        menu.entryList.push(entry);
    }

    return menu;
}

/* App Logic */
function intialize() {
    addMenuEntry('', '');
}

function onButtonGenerateClick() {
    let info = getMenuInfo();

    if (info.entryList.length == 0) {
        let title = document.getElementById("warning-modal-title");
        let body = document.getElementById("warning-modal-body");
        let button = document.getElementById("warning-modal-close-button");

        title.innerHTML = "Warning";
        body.innerHTML = "Please enter atleast 1 menu entry...";

        button.innerHTML = "Add a menu entry";
        button.onclick = function() {
            addMenuEntry('', '');
        }

        $('#warning-modal').modal('toggle');
        return;
    }

    generateBashScript(info);
}

function generateBashScript(obj) {
    let strResult = "";
    return strResult;
}
