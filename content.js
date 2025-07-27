const blockedUsers = ["Betrayer", "Zam", "Tidakterdaftar", "tidakterdaftar"];

function hideUserMessages() {
  document.querySelectorAll(".msg").forEach(msg => {
    const userSpan = msg.querySelector(".c_username");
    if (userSpan) {
      const username = userSpan.textContent.replace(":", "").trim();
      if (blockedUsers.includes(username)) {
        msg.style.display = "none";
      }
    }
  });
}

hideUserMessages();

const observer = new MutationObserver(hideUserMessages);
observer.observe(document.body, { childList: true, subtree: true });
