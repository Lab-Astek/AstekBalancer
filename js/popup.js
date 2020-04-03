document.getElementById("show-button").onclick = () => {
    chrome.runtime.sendMessage({
        groups:     document.getElementById("names-textarea").value.split("\n").map(str => (str.trim())).filter(e => e),
        from_time:  document.getElementById("time-start-input").value,
        to_time:    document.getElementById("time-end-input").value,
        offset:     parseInt(document.getElementById("offset-input").value) || 0,
        save_file:  false
    });
    console.log(123);
    console.log(document.getElementById("time-start-input").value);
};
document.getElementById("save-button").onclick = () => {
    chrome.runtime.sendMessage({
        groups:     document.getElementById("names-textarea").value.split("\n").map(str => (str.trim())).filter(e => e),
        from_time:  document.getElementById("time-start-input").value,
        to_time:    document.getElementById("time-end-input").value,
        offset:     parseInt(document.getElementById("offset-input").value) || 0,
        save_file:  true
    });
};
