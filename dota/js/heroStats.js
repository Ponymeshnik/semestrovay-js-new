export async function fetchHeroStats(heroName) {
    const HEROES = {};
    try {
        const response = await fetch('https://api.opendota.com/api/heroes');
        if (response.ok) {
            const heroes = await response.json();
            heroes.forEach(hero => {
                HEROES[hero.localized_name.toLowerCase()] = hero;
            });
        } else {
            console.error('Failed to fetch heroes from OpenDota API');
        }
    } catch (error) {
        console.error('Error fetching heroes:', error);
    }

    heroName = heroName.trim().toLowerCase();
    if (!HEROES[heroName]) {
        document.getElementById('heroStats').innerText = 'Hero not found. Please enter a valid hero name.';
        return;
    }

    try {
        const response = await fetch('https://api.opendota.com/api/heroStats');
        if (response.ok) {
            const heroesStats = await response.json();
            const heroStats = heroesStats.find(hero => hero.localized_name.toLowerCase() === heroName);
            if (!heroStats) {
                document.getElementById('heroStats').innerText = 'Hero stats not found.';
                return;
            }

            const totalProPick = heroesStats.reduce((sum, hero) => sum + (hero.pro_pick || 0), 0);
            const overallHealth = heroStats.base_health + (heroStats.base_str * 22);
            const overallArmor = heroStats.base_armor + (heroStats.base_agi * 0.17);
            const overallMana = heroStats.base_mana + (heroStats.base_int * 12);

            const message = `
                Hero: ${heroStats.localized_name}
                Winrate: ${(heroStats.pro_win / heroStats.pro_pick * 100).toFixed(2)}%
                Pickrate: ${(heroStats.pro_pick / totalProPick * 100).toFixed(2)}%
                Avg Kills: ${heroStats['3'] ? heroStats['3'].avg_kills.toFixed(2) : 'N/A'}
                Avg Deaths: ${heroStats['3'] ? heroStats['3'].avg_deaths.toFixed(2) : 'N/A'}
                Avg Assists: ${heroStats['3'] ? heroStats['3'].avg_assists.toFixed(2) : 'N/A'}
                ID: ${heroStats.id}
                Primary Attribute: ${heroStats.primary_attr}
                Attack Type: ${heroStats.attack_type}
                Roles: ${heroStats.roles.join(', ')}
                Base Health: ${heroStats.base_health}
                Base Health Regen: ${heroStats.base_health_regen}
                Base Mana: ${heroStats.base_mana}
                Base Mana Regen: ${heroStats.base_mana_regen}
                Base Armor: ${heroStats.base_armor}
                Base Magic Resist: ${heroStats.base_mr}
                Base Attack Min: ${heroStats.base_attack_min}
                Base Attack Max: ${heroStats.base_attack_max}
                Base Strength: ${heroStats.base_str}
                Strength Gain: ${heroStats.str_gain}
                Base Agility: ${heroStats.base_agi}
                Agility Gain: ${heroStats.agi_gain}
                Base Intelligence: ${heroStats.base_int}
                Intelligence Gain: ${heroStats.int_gain}
                Attack Range: ${heroStats.attack_range}
                Projectile Speed: ${heroStats.projectile_speed}
                Attack Rate: ${heroStats.attack_rate}
                Move Speed: ${heroStats.move_speed}
                Legs: ${heroStats.legs}
                Day Vision: ${heroStats.day_vision}
                Night Vision: ${heroStats.night_vision}
                Overall Health: ${overallHealth}
                Overall Armor: ${overallArmor.toFixed(2)}
                Overall Mana: ${overallMana}
            `;

            document.getElementById('hero-stats-container').innerText = message;
        } else {
            document.getElementById('heroStats').innerText = 'Failed to fetch hero stats from OpenDota API.';
        }
    } catch (error) {
        document.getElementById('heroStats').innerText = 'Error fetching hero stats: ' + error;
    }
}
