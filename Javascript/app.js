document.addEventListener('DOMContentLoaded', () => {
  const teamIds = [64, 65, 66];

  teamIds.forEach((teamId) => {
    fetch(`http://localhost:3000/nextMatch/${teamId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const tableBody = document.getElementById('tablebody');
        const newRow = tableBody.insertRow();
        const matchDateCell = newRow.insertCell();
        const homeTeamCell = newRow.insertCell();
        const awayTeamCell = newRow.insertCell();

        const matchDate = new Date(data.utcDate).toLocaleString();

        matchDateCell.innerText = `${matchDate}`;
        homeTeamCell.innerText = `${data.homeTeam.name}`;
        awayTeamCell.innerText = `${data.awayTeam.name}`;
      })
      .catch(error => {
        console.error(`Error fetching next match for team ${teamId}:`, error);
      });
  });
});