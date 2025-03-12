// JavaScript to fetch and display random user data
document.getElementById('fetch-user').addEventListener('click', function() {
    const url = "https://randomuser.me/api/";
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const user = data.results[0];
        const userInfo = document.getElementById('user-info');
  
        userInfo.innerHTML = `
          <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <img src="${user.picture.large}" alt="Profile Picture">
        `;
      })
      .catch(error => {
        console.error("Error fetching random user:", error);
      });
  });