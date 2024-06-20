export async function fetchPlayerStats(playerId) {
    const url = `https://api.opendota.com/api/players/${playerId}/wl`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw error;
    }
}

export async function fetchPlayerProfile(playerId) {
    const url = `https://api.opendota.com/api/players/${playerId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data.profile;
    } catch (error) {
        console.error('Error fetching player profile:', error);
        throw error;
    }
}

export async function fetchPlayerHeroes(playerId) {
    const url = `https://api.opendota.com/api/players/${playerId}/heroes`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching player heroes:', error);
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
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data.slice(0, 3);
    } catch (error) {
        console.error('Error fetching recent matches:', error);
        throw error;
    }
}

export async function fetchMatchDetails(matchId) {
    const url = `https://api.opendota.com/api/matches/${matchId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching match details:', error);
        throw error;
    }
}
