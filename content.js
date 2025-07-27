function hideUsers(users) {
  const messages = document.querySelectorAll(".msg");
  messages.forEach((msg) => {
    const usernameSpan = msg.querySelector(".c_username");
    if (usernameSpan) {
      const username = usernameSpan.textContent.replace(":", "").trim();
      if (users.includes(username)) {
        msg.style.display = "none";
      }
    }
  });
}

function observeAndHide(users) {
  const observer = new MutationObserver(() => hideUsers(users));
  observer.observe(document.body, { childList: true, subtree: true });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "refreshHide") {
    chrome.storage.local.get(["hiddenUsers"], (data) => {
      const users = data.hiddenUsers || [];
      hideUsers(users); // panggil ulang
    });
  }
});
