document.getElementById("apply-button").onclick = () => {
    chrome.runtime.sendMessage({
        size:   document.getElementById("size-input").value || 0,
        id:     document.getElementById("id-input").value || 0
    });
};
document.getElementById("general-button").onclick = () => {
    chrome.runtime.sendMessage({
        size:       document.getElementById("size-input").value || 0,
        id:         document.getElementById("id-input").value || 0,
        is_general: true
    });
};
