function getTimeFromDate(date) {
    return date.split(" ").reverse()[0].padStart(5, "0");
}

function markUsers(groups_size, group_id, is_general) {
    var items = Array.from(document.querySelectorAll(".item.busy"));
    var logins = items.map((el, idx) => ({date: el.children[1].innerText, email: el.children[3].innerText, idx: idx}));
    const dict = {};
    // const COLORS = ["#f66", "#fa0", "#ffa", "#5c5", "#0dd", "#66f", "#f6f", "#ccc"];

    if (groups_size < 1 || !is_general && (group_id < 1 || group_id > groups_size))
        return false;
    items.forEach(el => dict[el.children[3].innerText] = el);
    logins.sort((a, b) => (-1 + 2 * (getTimeFromDate(a.date) + a.email > getTimeFromDate(b.date) + b.email)));
    for (let i = 0; i < logins.length; i++) {
        if (is_general) {
            dict[logins[i].email].style.backgroundColor = `hsl(${i % groups_size / groups_size * 360}, 85%, 85%)`;
            dict[logins[i].email].children[7].innerText += `, #${1 + i % groups_size}`;
        } else if (i % groups_size == group_id - 1)
            dict[logins[i].email].style.backgroundColor = "#ff0";
    }
    return true;
}

if (!window.highlited) {
    if (markUsers(parseInt(astekifier_data.size), parseInt(astekifier_data.id), astekifier_data.is_general))
        window.highlited = true;
}
