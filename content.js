const blockedUsers = ["loly"]; //throw a pie in his face if you meet him 

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

const observer = new MutationObserver(hideUserMessages); //always listen to DOM
observer.observe(document.body, { childList: true, subtree: true });
