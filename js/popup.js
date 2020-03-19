document.getElementById("apply-button").onclick = () => {
    chrome.runtime.sendMessage({
        size:   document.getElementById("size-input").value || 0,
        id:     document.getElementById("id-input").value || 0
    });
};
