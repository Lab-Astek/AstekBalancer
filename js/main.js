function getTimeFromDate(date) {
    return date.split(" ").reverse()[0].padStart(5, "0");
}

function markUsers(groups_size, group_id) {
    var items = Array.from(document.querySelectorAll(".item.busy"));
    var logins = items.map((el, idx) => ({date: el.children[1].innerText, email: el.children[3].innerText, idx: idx}));
    const dict = {};

    if (groups_size < 1 || group_id < 1 || group_id > groups_size)
        return false;
    items.forEach(el => dict[el.children[3].innerText] = el);
    logins.sort((a, b) => (-1 + 2 * (getTimeFromDate(a.date) + a.email > getTimeFromDate(b.date) + b.email)));
    for (let i = 0; i < logins.length; i++) {
        if (i % groups_size == group_id - 1)
            dict[logins[i].email].style.backgroundColor = "#ff0";
    }
    return true;
}

if (!window.highlited) {
    if (markUsers(parseInt(astekifier_data.size), parseInt(astekifier_data.id)))
        window.highlited = true;
}
