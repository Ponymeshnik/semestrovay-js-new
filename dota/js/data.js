export async function fetchPlayerStats(playerId) {
    const url = `https://api.opendota.com/api/players/${playerId}/wl`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`ошибка: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при получении статистики игрока:', error);
        throw error;
    }
}

export async function fetchPlayerProfile(playerId) {
    const url = `https://api.opendota.com/api/players/${playerId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`ошибка: ${response.statusText}`);
        }
        const data = await response.json();
        return data.profile;
    } catch (error) {
        console.error('Ошибка при получении профиля игрока:', error);
        throw error;
    }
}

export async function fetchPlayerHeroes(playerId) {
    const url = `https://api.opendota.com/api/players/${playerId}/heroes`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`ошибка: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при получении героев игроков:', error);
        throw error;
    }
}

export async function fetchHeroesList() {
    const url = 'https://api.opendota.com/api/heroes';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching heroes list:', error);
        throw error;
    }
}

export async function fetchRecentMatches(playerId) {
    const url = `https://api.opendota.com/api/players/${playerId}/recentMatches`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }
        const data = await response.json();
        return data.slice(0, 3);
    } catch (error) {
        console.error('Ошибка при извлечении последних совпадений:', error);
        throw error;
    }
}

export async function fetchMatchDetails(matchId) {
    const url = `https://api.opendota.com/api/matches/${matchId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при получении данных о матче:', error);
        throw error;
    }
}
