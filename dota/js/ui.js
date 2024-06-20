import { fetchHeroStats } from './heroStats.js';

export function displayWelcomePage() {
    document.getElementById('welcome-page').style.display = 'block';
    document.getElementById('main-page').style.display = 'none';
}

export function displayMainPage(nickname) {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
    document.getElementById('greeting').textContent = `Привет, ${nickname}!`;

    const fetchHeroStatsBtn = document.getElementById('fetch-hero-stats-btn');
    fetchHeroStatsBtn.addEventListener('click', async () => {
        const heroName = document.getElementById('hero-name').value;
        if (heroName) {
            await fetchHeroStats(heroName);
        }
    });
}

export function displayStats(stats, winRate) {
    const heroStatsContainer = document.getElementById('hero-stats-container');
    heroStatsContainer.innerHTML = '';
    const statsTable = document.createElement('table');
    statsTable.innerHTML = `
        <thead>
            <tr>
                <th>Wins</th>
                <th>Losses</th>
                <th>Winrate (%)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${stats.win}</td>
                <td>${stats.lose}</td>
                <td>${winRate}</td>
            </tr>
        </tbody>
    `;
    heroStatsContainer.appendChild(statsTable);
}


export function displayPlayerInfo(topPlayedHeroes, topWinrateHeroes) {
    const main = document.querySelector('main');

    const playedHeroesTable = document.createElement('table');
    playedHeroesTable.innerHTML = `
        <thead>
            <tr>
                <th colspan="3">Top Played Heroes</th>
            </tr>
            <tr>
                <th>Hero</th>
                <th>Games</th>
                <th>Winrate (%)</th>
            </tr>
        </thead>
        <tbody>
            ${topPlayedHeroes.map(hero => `
                <tr>
                    <td>${hero.localized_name || 'Unknown'}</td>
                    <td>${hero.games}</td>
                    <td>${((hero.win / hero.games) * 100).toFixed(2)}</td>
                </tr>`).join('')}
        </tbody>
    `;

    const winrateHeroesTable = document.createElement('table');
    winrateHeroesTable.innerHTML = `
        <thead>
            <tr>
                <th colspan="3">Top Winrate Heroes</th>
            </tr>
            <tr>
                <th>Hero</th>
                <th>Games</th>
                <th>Winrate (%)</th>
            </tr>
        </thead>
        <tbody>
            ${topWinrateHeroes.map(hero => `
                <tr>
                    <td>${hero.localized_name || 'Unknown'}</td>
                    <td>${hero.games}</td>
                    <td>${((hero.win / hero.games) * 100).toFixed(2)}</td>
                </tr>`).join('')}
        </tbody>
    `;

    main.appendChild(playedHeroesTable);
    main.appendChild(winrateHeroesTable);
}

export function displayRecentMatches(matches, heroMap, playerId) {
    const main = document.querySelector('main');

    const recentMatchesTable = document.createElement('table');
    recentMatchesTable.innerHTML = `
        <thead>
            <tr>
                <th>Match ID</th>
                <th>Duration</th>
                <th>Winner</th>
                <th>Radiant Heroes</th>
                <th>Dire Heroes</th>
                <th>Radiant Net Worth</th>
                <th>Dire Net Worth</th>
            </tr>
        </thead>
        <tbody>
            ${matches.map(match => {
                const player = match.players.find(player => player.account_id == playerId);
                const playerSlot = player.player_slot;
                const isRadiant = playerSlot < 128;
                const radiantWin = match.radiant_win;

                const radiantNetWorth = match.players
                    .filter(player => player.player_slot < 128)
                    .reduce((acc, player) => acc + (player.net_worth || 0), 0);
                const direNetWorth = match.players
                    .filter(player => player.player_slot >= 128)
                    .reduce((acc, player) => acc + (player.net_worth || 0), 0);

                return `
                <tr>
                    <td>${match.match_id}</td>
                    <td>${Math.floor(match.duration / 60)}:${('0' + (match.duration % 60)).slice(-2)}</td>
                    <td>${radiantWin ? 'Radiant' : 'Dire'}</td>
                    <td>
                        ${match.players.filter(player => player.player_slot < 128).map(player => {
                            const heroName = heroMap[player.hero_id] || 'Unknown';
                            return player.account_id == playerId ? `<strong>${heroName}</strong>` : heroName;
                        }).join(', ')}
                    </td>
                    <td>
                        ${match.players.filter(player => player.player_slot >= 128).map(player => {
                            const heroName = heroMap[player.hero_id] || 'Unknown';
                            return player.account_id == playerId ? `<strong>${heroName}</strong>` : heroName;
                        }).join(', ')}
                    </td>
                    <td>${radiantNetWorth}</td>
                    <td>${direNetWorth}</td>
                </tr>`;
            }).join('')}
        </tbody>
    `;

    main.appendChild(recentMatchesTable);
}


export function displayError(message) {
    const main = document.querySelector('main');
    main.innerHTML = `<p style="color: red;">${message}</p>`;
}
