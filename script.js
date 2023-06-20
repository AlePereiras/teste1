const tableBodyElement = document.querySelector('#userTable tbody');
const paginationElement = document.querySelector('.pagination');

const pages = [1, 2, 3];

function fetchUsers(page) {
  fetch(`https://randomuser.me/api/?results=10&nat=BR&seed=abc&page=${page}`)
    .then(response => response.json())
    .then(data => {
      const users = data.results;
      tableBodyElement.innerHTML = '';

      users.forEach(user => {
        const row = document.createElement('tr');
        const photoCell = document.createElement('td');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const phoneCell = document.createElement('td');
        const cityCell = document.createElement('td');
        const countryCell = document.createElement('td');

        const photoImage = document.createElement('img');
        photoImage.src = user.picture.medium;
        photoCell.appendChild(photoImage);

        nameCell.textContent = `${user.name.first} ${user.name.last}`;
        emailCell.textContent = user.email;
        phoneCell.textContent = user.phone;
        cityCell.textContent = user.location.city;
        countryCell.textContent = user.location.country;

        row.appendChild(photoCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(phoneCell);
        row.appendChild(cityCell);
        row.appendChild(countryCell);

        tableBodyElement.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Ocorreu um erro ao buscar os usuários:', error);
    });
}

function createButton(page) {
  const button = document.createElement('button');
  button.textContent = `Página ${page}`;

  button.addEventListener('click', () => {
    fetchUsers(page);
  });

  return button;
}

// Criar os botões para cada página
pages.forEach(page => {
  const button = createButton(page);
  paginationElement.appendChild(button);
});

// Buscar usuários na primeira página por padrão
fetchUsers(1);