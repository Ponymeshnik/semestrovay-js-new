import { fetchPlayerStats, fetchPlayerProfile, fetchPlayerHeroes, fetchHeroesList, fetchRecentMatches, fetchMatchDetails } from './data.js';
import { displayStats, displayError, displayPlayerInfo, displayRecentMatches } from './ui.js';
import { Cursor } from './cursor.js';
import { fetchHeroStats } from './heroStats.js';

document.addEventListener('DOMContentLoaded', () => {
    displayWelcomePage();

    const cursor = new Cursor();

    const continueBtn = document.getElementById('continue-btn');
    continueBtn.addEventListener('click', () => {
        const playerId = document.getElementById('player-id').value;
        if (playerId) {
            loadPlayerInfo(playerId);
        }
    });

    const bgColorButtons = document.querySelectorAll('.bg-color-btn');
    bgColorButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.body.style.backgroundColor = button.getAttribute('data-color');
        });
    });

    document.addEventListener('mousemove', (event) => {
        cursor.move(event);
    });

    document.getElementById('fetch-hero-stats-btn').addEventListener('click', async () => {
        const heroName = document.getElementById('hero-name').value;
        if (heroName) {
            await fetchAndDisplayHeroStats(heroName);
        } else {
            alert('Пожалуйста, введите имя героя.');
        }
    });

    document.getElementById('back-button').addEventListener('click', () => {
        displayMainPage();
    });
});

async function loadPlayerInfo(playerId) {
    try {
        const [stats, profile, heroes, heroesList, recentMatches] = await Promise.all([
            fetchPlayerStats(playerId),
            fetchPlayerProfile(playerId),
            fetchPlayerHeroes(playerId),
            fetchHeroesList(),
            fetchRecentMatches(playerId)
        ]);

        const heroMap = heroesList.reduce((map, hero) => {
            map[hero.id] = hero.localized_name;
            return map;
        }, {});

        const winRate = ((stats.win / (stats.win + stats.lose)) * 100).toFixed(2);
        const topPlayedHeroes = heroes.slice(0, 3).map(hero => ({
            ...hero,
            localized_name: heroMap[hero.hero_id]
        }));
        const topWinrateHeroes = [...heroes]
            .sort((a, b) => (b.win / b.games) - (a.win / a.games))
            .slice(0, 3)
            .map(hero => ({
                ...hero,
                localized_name: heroMap[hero.hero_id]
            }));

        const recentMatchDetails = await Promise.all(recentMatches.slice(0, 3).map(match => fetchMatchDetails(match.match_id)));

        displayMainPage(profile.personaname);
        displayStats(stats, winRate);
        displayPlayerInfo(topPlayedHeroes, topWinrateHeroes);
        displayRecentMatches(recentMatchDetails, heroMap, playerId);
    } catch (error) {
        displayError('Не удалось получить информацию об игроке. Пожалуйста, повторите попытку позже.');
    }
}

async function fetchAndDisplayHeroStats(heroName) {
    await fetchHeroStats(heroName);
    displayHeroStatsPage();
}

function displayWelcomePage() {
    document.getElementById('welcome-page').style.display = 'block';
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('hero-stats-page').style.display = 'none';
}

function displayMainPage(playerName = '') {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
    document.getElementById('hero-stats-page').style.display = 'none';

    if (playerName) {
        document.getElementById('greeting').textContent = `Hello, ${playerName}!`;
    }
}

function displayHeroStatsPage() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('hero-stats-page').style.display = 'block';
}
