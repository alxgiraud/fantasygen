/*global app*/
app.factory('groupNamesGenerator', ['nameGenerator', function (nameGenerator) {
    'use strict';

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    var mysticOrder = {
            patterns: [
                '<group> of the <entity>',
                '<group> of the <description> <entity>',
                '<description> <group> of the <description> <entity>',
                '<description> <group>'
            ],
            group: {
                cliques: ['alliance', 'association', 'band', 'brotherhood', 'cabal', 'circle', 'conclave', 'confraternity', 'convocation', 'coterie', 'fellowship', 'fraternity', 'guild', 'league', 'order', 'siblingship', 'sisterhood', 'society', 'sorority'],
                people: ['adepts', 'apostles', 'aspirants', 'brothers', 'children', 'colleagues', 'devotees', 'disciples', 'fellows', 'followers', 'gentlemen', 'illuminants', 'initiates', 'keepers', 'ladies', 'masters', 'probers', 'revealers', 'seekers', 'servants', 'siblings', 'sisters', 'votaries']
            },
            description: {
                quality: ['ancient', 'arcane', 'astral', 'blinding', 'bright', 'brilliant', 'burning', 'bygone', 'cardinal', 'celestial', 'cloudy', 'concealed', 'cosmic', 'dark', 'deep', 'dexter', 'difficult', 'dusky', 'effulgent', 'elder', 'elemental', 'esoteric', 'eternal', 'ethereal', 'existential', 'forgotten', 'gloomy', 'glorious', 'glowing', 'gnostic', 'hidden', 'ineffable', 'inner', 'lost', 'luminous', 'lunar', 'magical', 'maieutical', 'mysterious', 'mystic', 'occult', 'penumbral', 'profound', 'pure', 'quintessential', 'radiant', 'recondite', 'resplendent', 'revealed', 'sacred', 'secret', 'shadowed', 'shining', 'sidereal', 'singing', 'sinister', 'solemn', 'spiral', 'spiritual', 'starry', 'solar', 'sublime', 'supernal', 'timeless', 'transcendent', 'true', 'veiled', 'zetetic'],
                colour: ['amber', 'amethyst', 'aquamarine', 'azure', 'beryl', 'black', 'blue', 'brazen', 'bronze', 'brown', 'carmine', 'cerulean', 'copper', 'crimson', 'crystal', 'ebony', 'emerald', 'golden', 'green', 'grey', 'incarnadine', 'indigo', 'ivory', 'jade', 'jet', 'malachite', 'orange', 'pearly', 'purple', 'rainbow', 'red', 'rosy', 'ruby', 'russet', 'sable', 'sapphire', 'scarlet', 'silver', 'topaz', 'turquoise', 'umber', 'vermilion', 'violaceous', 'violet', 'viridian', 'white', 'yellow']
            },
            entities: ['arcana', 'beyond', 'chalice', 'chamber', 'cloud', 'cowl', 'crown', 'crystal', 'darkness', 'dawn', 'day', 'doctrine', 'dominion', 'energy', 'enlightenment', 'eye', 'faith', 'fane', 'fire', 'flame', 'fountain', 'gate', 'glyph', 'grail', 'hand', 'harmony', 'heart', 'helix', 'influence', 'insight', 'key', 'knowledge', 'learning', 'light', 'lore', 'mantle', 'mastery', 'mind', 'moon', 'mystery', 'night', 'orb', 'path', 'pentacle', 'pillar', 'pool', 'portal', 'power', 'pyramid', 'question', 'radiance', 'rainbow', 'revelation', 'robe', 'rod', 'sapience', 'sceptre', 'scroll', 'secret', 'shadow', 'shrine', 'sigil', 'sign', 'sky', 'space', 'sphere', 'spring', 'staff', 'star', 'stone', 'sun', 'symbol', 'teaching', 'temple', 'throne', 'time', 'truth', 'twilight', 'veil', 'verity', 'void', 'wand', 'way', 'wisdom', 'word', 'world']
        },
        militaryUnit = {
            patterns: [
                '<commander>\'s <group>',
                '<description> <group>',
                '<description> <description> <group>',
                '<group> of the <place>'
            ],
            groups: [
                //team 
                ['armada', 'army', 'battalion', 'brigade', 'cohort', 'commandos', 'company', 'contingent', 'division', 'fleet', 'force', 'garrison', 'guard', 'legion', 'militia', 'patrol', 'phalanx', 'platoon', 'regiment', 'section', 'sentinel', 'sentry', 'squad', 'squadron', 'troop', 'vanguard'],
                //soldiers
                ['avengers', 'champions', 'elite', 'fighters', 'janissaries', 'marines', 'paladins', 'riders', 'skirmishers', 'soldiers', 'troopers', 'veterans', 'victors', 'warriors'],
                //warders
                ['crusaders', 'defenders', 'guardians', 'guards', 'keepers', 'knights', 'lords', 'preservers', 'protectors', 'rangers', 'sentinels', 'sentries', 'wardens', 'warders', 'watchers'],
                //mercenaries
                ['bandits', 'destroyers', 'devourers', 'marauders', 'pirates', 'raptors', 'reavers'],
                //gear
                ['arrows', 'axes', 'blades', 'bows', 'bucklers', 'claws', 'daggers', 'darts', 'fangs', 'fists', 'flails', 'gauntlets', 'halberds', 'hammers', 'helms', 'knives', 'lances', 'maces', 'pikes', 'scythes', 'shields', 'spears', 'swords', 'talons', 'teeth'],
                //creatures
                ['angels', 'basilisks', 'cobras', 'demons', 'devils', 'eagles', 'falcons', 'griffins', 'hawks', 'hounds', 'jaguars', 'lions', 'panthers', 'rats', 'scorpions', 'sharks', 'tigers', 'vipers', 'wolves']
            ],
            description: {
                colour: ['black', 'white', 'red', 'gold', 'silver', 'iron', 'blue', 'green', 'grey'],
                other: ['battle', 'blood', 'bolt', 'bone', 'chaos', 'dark', 'death', 'dire', 'doom', 'fire', 'flame', 'free', 'high', 'law', 'light', 'lightning', 'moon', 'night', 'rune', 'sea', 'skull', 'star', 'storm', 'sun', 'thunder', 'thunderbolt', 'torch', 'war', 'wave', 'wind', 'wing', 'wrath']
            },
            places: {
                seas: ['billow', 'breaker', 'brine', 'deep', 'foam', 'main', 'ocean', 'sea', 'surf', 'swell', 'water', 'wave'],
                lands: ['cave', 'cavern', 'city', 'crag', 'dell', 'desert', 'earth', 'forest', 'grove', 'hall', 'hill', 'hinterland', 'isle', 'lake', 'land', 'march', 'marsh', 'path', 'plain', 'province', 'range', 'river', 'rock', 'sand', 'shore', 'stone', 'stream', 'tower', 'trail', 'valley', 'water', 'way', 'wood']
            }
        },
        thievesAndAssassins = {
            roles: ['arrangers', 'bestowers', 'disbursers', 'disposers', 'harmonisers', 'reconcilers', 'regulators', 'reinstaters', 'restorers'],
            goals: ['balance', 'congruity', 'correlation', 'correspondence', 'equilibrium', 'equipoise', 'equity', 'equivalence', 'parity', 'symmetry'],
            adjectives: ['acute', 'apposite', 'apt', 'decisive', 'dependable', 'extreme', 'faithful', 'final', 'fitting', 'impartial', 'reliable', 'supreme', 'ultimate', 'utmost'],
            actions: ['action', 'justice', 'reckoning', 'recompense', 'redress', 'reparation', 'reprisal', 'requital', 'retribution', 'satisfaction', 'vindication'],
            titles: ['alliance', 'association', 'company', 'corporation', 'organisation', 'society', 'syndicate'],
            descriptions: ['black', 'cloud', 'dark', 'dim', 'dusk', 'fog', 'gloom', 'grey', 'night', 'shade', 'shadow', 'smoke', 'quiet', 'subtle', 'whispering', 'bloody', 'hidden', 'red', 'ready', 'sharp', 'sudden'],
            groups: [
                //weapon
                ['blade', 'bolt', 'claw', 'dagger', 'dirk', 'fang', 'hand', 'knife'],
                //item
                ['balance', 'hourglass', 'scales', 'cloak', 'cowl', 'hand', 'hood', 'mantle', 'mask'],
                //creature
                ['snake', 'scorpion', 'spider', 'bat', 'cat', 'daw', 'dog', 'owl', 'pye', 'rat', 'weasel'],
                //action
                ['bring', 'find', 'hunt', 'kill', 'search', 'seek', 'shadow', 'slay', 'stalk']
            ]
        };

    return {
        getMysticOrderName: function () {
            var options = {
                    group: (Math.random() < 0.5) ? mysticOrder.group.cliques : mysticOrder.group.people,
                    entity: mysticOrder.entities,
                    description: mysticOrder.description.quality.concat(mysticOrder.description.colour)
                },
                d10 = Math.floor(Math.random() * 10) + 1,
                name;

            if (d10 < 2) {
                name = mysticOrder.patterns[0];
            } else if (d10 < 9) {
                name = mysticOrder.patterns[1];
            } else if (d10 < 10) {
                name = mysticOrder.patterns[2];
            } else {
                name = mysticOrder.patterns[3];
            }

            return name.replace(/<([\w\W]*?)>/g, function (match) {
                match = match.replace(/<|>/g, '');
                return options[match][Math.floor(Math.random() * options[match].length)].capitalize();
            });
        },
        getMilitaryUnitsName: function () {
            var options = {
                    commander: [],
                    group: militaryUnit.groups[Math.floor(Math.random() * 6)].slice(),
                    description: militaryUnit.description.colour.concat(militaryUnit.description.other).slice(),
                    place: militaryUnit.places.seas.concat(militaryUnit.places.lands).slice()
                },
                d10 = Math.floor(Math.random() * 10) + 1,
                name;


            if (d10 < 2) {
                options.commander = [nameGenerator.getFantasyName()];
                name = militaryUnit.patterns[0];
            } else if (d10 < 8) {
                name = militaryUnit.patterns[1];
            } else if (d10 < 10) {
                name = militaryUnit.patterns[2];
            } else {
                name = militaryUnit.patterns[3];
            }

            return name.replace(/<([\w\W]*?)>/g, function (match) {
                var item,
                    index;

                match = match.replace(/<|>/g, '');
                item = options[match][Math.floor(Math.random() * options[match].length)];
                index = options[match].indexOf(item);

                if (index > -1) {
                    // Remove item from copied array (.slice()) to avoid duplicates
                    options[match].splice(index, 1);
                }

                return item.capitalize();
            });
        },
        getThievesAndAssassinsName: function () {
            var d30 = Math.floor(Math.random() * 30) + 1,
                rngGroup,
                name;

            if (d30 < 6) {
                name = thievesAndAssassins.roles[Math.floor(Math.random() * thievesAndAssassins.roles.length)].capitalize() +
                    ' of ' + thievesAndAssassins.goals[Math.floor(Math.random() * thievesAndAssassins.goals.length)].capitalize();
            } else if (d30 < 11) {
                name = thievesAndAssassins.adjectives[Math.floor(Math.random() * thievesAndAssassins.adjectives.length)].capitalize() +
                    ' ' + thievesAndAssassins.actions[Math.floor(Math.random() * thievesAndAssassins.actions.length)].capitalize() +
                    ' ' + thievesAndAssassins.titles[Math.floor(Math.random() * thievesAndAssassins.titles.length)].capitalize();
            } else {
                name = thievesAndAssassins.descriptions[Math.floor(Math.random() * thievesAndAssassins.descriptions.length)].capitalize();
                rngGroup = thievesAndAssassins.groups[Math.floor(Math.random() * thievesAndAssassins.groups.length)];
                name += ' ' + rngGroup[Math.floor(Math.random() * rngGroup.length)].capitalize();
            }

            return name;
        }
    };

}]);
