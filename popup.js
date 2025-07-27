const usernameInput = document.getElementById("username");
const hideBtn = document.getElementById("hideBtn");
const userList = document.getElementById("userList");

function updateUserList() {
  chrome.storage.local.get(["hiddenUsers"], (data) => {
    userList.innerHTML = "";
    const users = data.hiddenUsers || [];
    users.forEach((user, index) => {
      const li = document.createElement("li");
      li.textContent = user;
      li.style.cursor = "pointer";
      li.title = "Klik untuk hapus";
      li.onclick = () => {
        users.splice(index, 1);
        chrome.storage.local.set({ hiddenUsers: users }, updateUserList);
      };
      userList.appendChild(li);
    });
  });
}

hideBtn.onclick = () => {
  const user = usernameInput.value.trim();
  if (!user) return;
  chrome.storage.local.get(["hiddenUsers"], (data) => {
    const users = data.hiddenUsers || [];
    if (!users.includes(user)) {
      users.push(user);
      chrome.storage.local.set({ hiddenUsers: users }, updateUserList);
    }
    usernameInput.value = "";
  });
};

updateUserList();
