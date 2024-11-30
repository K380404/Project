// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", () => {
    const gridItems = document.querySelectorAll(".grid-item");

    // Add click event listeners to each grid item
    gridItems.forEach((item, index) => {
        const iframe = item.querySelector("iframe");

        // Open the video in a modal when the item is clicked
        item.addEventListener("click", () => {
            openModal(iframe.src, iframe.title);
        });
    });

    // Function to create a modal
    function createModal() {
        const modal = document.createElement("div");
        modal.id = "videoModal";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        modal.style.display = "none";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "1000";

        const modalContent = document.createElement("div");
        modalContent.style.position = "relative";
        modalContent.style.maxWidth = "80%";
        modalContent.style.maxHeight = "80%";

        const closeBtn = document.createElement("span");
        closeBtn.innerText = "×";
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "-30px";
        closeBtn.style.right = "0";
        closeBtn.style.fontSize = "30px";
        closeBtn.style.color = "#fff";
        closeBtn.style.cursor = "pointer";

        const iframe = document.createElement("iframe");
        iframe.id = "modalVideo";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;

        closeBtn.addEventListener("click", closeModal);

        modalContent.appendChild(iframe);
        modalContent.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        return modal;
    }

    // Function to open the modal
    function openModal(src, title) {
        const modal = document.getElementById("videoModal") || createModal();
        const iframe = modal.querySelector("#modalVideo");
        iframe.src = src;
        iframe.title = title;
        modal.style.display = "flex";
    }

    // Function to close the modal
    function closeModal() {
        const modal = document.getElementById("videoModal");
        if (modal) {
            const iframe = modal.querySelector("#modalVideo");
            iframe.src = ""; // Stop the video
            modal.style.display = "none";
        }
    }

    // Add a search bar for filtering videos by title
    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.placeholder = "Search for a movie...";
    searchBar.style.margin = "20px";
    searchBar.style.padding = "10px";
    searchBar.style.width = "90%";

    document.body.insertBefore(searchBar, document.querySelector(".grid-container"));

    searchBar.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        gridItems.forEach((item) => {
            const iframe = item.querySelector("iframe");
            if (iframe.title.toLowerCase().includes(query)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});
