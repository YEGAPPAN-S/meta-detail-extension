document.addEventListener("DOMContentLoaded", async function () {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractMetaData
    }, (results) => {
        if (results && results[0].result) {
            let data = results[0].result;

            // Title Data
            document.getElementById("metaTitle").textContent = data.title || "Not found";
            document.getElementById("titleWordCount").textContent = data.titleWordCount;
            document.getElementById("titleCharCount").textContent = data.titleCharCount;

            // Description Data
            document.getElementById("metaDescription").textContent = data.description || "Not found";
            document.getElementById("descWordCount").textContent = data.descWordCount;
            document.getElementById("descCharCount").textContent = data.descCharCount;
        }
    });
});

// Function to extract meta data
function extractMetaData() {
    let title = document.title.trim() || "";
    let description = document.querySelector("meta[name='description']")?.content.trim() || "";

    // Word and Character Counts
    let titleWordCount = title.split(/\s+/).filter(word => word.length > 0).length;
    let titleCharCount = title.length;

    let descWordCount = description.split(/\s+/).filter(word => word.length > 0).length;
    let descCharCount = description.length;

    return {
        title,
        description,
        titleWordCount,
        titleCharCount,
        descWordCount,
        descCharCount
    };
}
