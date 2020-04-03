function getTimeFromDate(date) {
    return date.split(" ").reverse()[0].padStart(5, "0").split("h").join(":");
}

function saveAsFile(str, filename) {
    var file = new Blob(
        [str],
        { type: "text/plain;charset=utf-8" }
    );
    var a = document.createElement("a"),

    url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function saveGroups(logins, group_names, timestamp, offset) {
    var dict        = {};
    var str         = "";
    const header    = `===== AstekBalancer output =====\n\n` +
        `Project:   ${document.querySelector(".item.title > h1").innerText || ""}\n` +
        `URL:       ${document.URL}\n` +
        `Date:      ${logins[0].date.split(", ")[0]}\n` +
        `Timestamp: ${timestamp}\n` +
        `Offset:    ${offset}\n\n`

    logins.forEach(data => {
        let time = data.date.split(", ").reverse()[0];

        if (!dict[data.idx])
            dict[data.idx] = {};
        if (!dict[data.idx][time])
            dict[data.idx][time] = [];
        dict[data.idx][time].push(`  ${data.email}`);
    });
    for (let group_id of Object.keys(dict)) {
        let val = dict[group_id];

        saveAsFile(
            header +
            `Group #${parseInt(group_id) + 1} (${group_names[group_id] || ""})\n\n` +
            Object.entries(val).map(([time, emails]) => (
                `=== ${time} ===\n${emails.join("\n")}\n`
            )
        ).join("\n"), `group_${parseInt(group_id) + 1}_${group_names[group_id].split(" ").join("_")}.txt`);
    }
}

function markUsers(group_names, from_time, to_time, offset, save_file) {
    var items           = Array.from(document.querySelectorAll(".item.busy"));
    const groups_size   = group_names.length;
    const dict          = {};
    var logins          = items.map((el, idx) => ({
        date: el.children[1].innerText,
        time: getTimeFromDate(el.children[1].innerText),
        email: el.children[3].innerText,
        is_active: getTimeFromDate(el.children[1].innerText) >= from_time
            && getTimeFromDate(el.children[1].innerText) <= to_time
    }));

    // console.log(logins, from_time, to_time, offset);
    items.forEach(el => {
        el.style = {};
        el.children[7].innerText = el.children[7].innerText.split(",")[0];
    });
    if (
        groups_size < 1
        || !logins.length
        || !group_names.length
        || group_names.length == 1 && !group_names[0].length
    )
        return false;
    items.forEach(el => dict[el.children[3].innerText] = el);
    logins = logins.filter(el => (el.is_active));
    logins.sort((a, b) => (-1 + 2 * (a.time + a.email > b.time + b.email)));
    for (let i = 0; i < logins.length; i++) {
        let group_id = (i + offset) % groups_size;

        if (logins[i].is_active) {
            dict[logins[i].email].style.backgroundColor = `hsl(${group_id  / groups_size * 360}, 85%, 85%)`;
            dict[logins[i].email].children[7].innerText += `, #${group_id + 1}`;
        }
        logins[i].idx = group_id;
    }
    if (save_file)
        saveGroups(logins, group_names, from_time + " -> " + to_time, offset);
    return true;
}

markUsers(
    astekifier_data.groups,
    astekifier_data.from_time,
    astekifier_data.to_time,
    astekifier_data.offset,
    astekifier_data.save_file
);
