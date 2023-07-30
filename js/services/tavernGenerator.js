/*global app */
app.factory('tavernGenerator', [function () {
    'use strict';

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    var patterns = [
            '<adjective> <noun>',
            '<adjective> <noun> <title>',
            'The <adjective> <noun>',
            'The <adjective> <noun> <title>',
            '<noun> & <noun>',
            '<noun> & <noun> <title>',
            '<adjective> <title>',
            'The <adjective> <title>'
        ],
        defaultValues = {
            nouns: ['dog', 'wolf', 'fox', 'cat', 'lion', 'tiger', 'kitten', 'ox', 'cow', 'sow', 'bull', 'calf', 'horse', 'stallion', 'mare', 'foal', 'owl', 'eagle', 'falcon', 'hawk', 'raven', 'crow', 'gull', 'fish', 'whale', 'shark', 'octopus', 'squid', 'goat', 'sheep', 'ewe', 'fly', 'butterfly', 'dragonfly', 'beetle', 'ant', 'wasp', 'termite', 'louse', 'worm', 'lizard', 'frog', 'toad', 'snake', 'chameleon', 'unicorn', 'gryphon', 'dragon', 'wyvern', 'roc', 'clam', 'oyster', 'starfish', 'slug', 'snail', 'mouse', 'rat', 'beaver', 'marten', 'mink', 'otter', 'seal', 'manatee', 'chipmunk', 'squirrel', 'gopher', 'tower', 'castle', 'dagger', 'sword', 'bow', 'arrow', 'hat', 'boot', 'trophy', 'goose', 'duck', 'boat', 'ship', 'river', 'falls', 'forest', 'mountain', 'vampire', 'skeleton', 'witch', 'wench', 'lady', 'lord', 'knight', 'drunk', 'shield', 'wand', 'helm', 'flask', 'flagon', 'pint', 'shot'],
            adjectives: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'sanguine', 'sepia', 'ochre', 'puce', 'navy', 'maroon', 'pink', 'peach', 'cyan', 'violet', 'brown', 'black', 'gray', 'white', 'silver', 'gold', 'jumping', 'sleeping', 'running', 'rolling', 'laughing', 'singing', 'flying', 'burning', 'swimming', 'crying', 'roaring', 'screaming', 'silent', 'petrified', 'hiding', 'hidden', 'lost', 'forgotten', 'shiny', 'drowning', 'giant', 'tiny', 'fat', 'skinny', 'humorous', 'lonely', 'drunken', 'slimy', 'undead', 'dark', 'bright', 'magical', 'enchanted', 'poor', 'wealthy', 'lucky', 'unfortunate', 'angry', 'happy', 'sad', 'thieving', 'desperate', 'divine', 'arcane', 'profane', 'discreet', 'buried', 'false', 'foolish', 'flatulent', 'hypnotic', 'haunted', 'special', 'fun', 'drab', 'daring', 'stubborn', 'sober', 'talking', 'naked', 'suffering', 'cheap', 'smelly', 'easy', 'heroic', 'hovering', 'married', 'pious', 'pompous', 'illegal', 'sacred', 'defiled', 'spoilt', 'wooden', 'bloody', 'yawning', 'sleepy', 'hungry'],
            titles: ['bar', 'brew house', 'beer house', 'mead house', 'ale house', 'speakeasy', 'pub', 'lounge', 'brewery', 'loft', 'club house', 'inn', 'tavern', 'den', 'lodge']
        },
        nouns = defaultValues.nouns,
        adjectives = defaultValues.adjectives,
        titles = defaultValues.titles;


    return {
        getName: function (startWith, endWith, contains, doesntContains) {

            var options = {
                    noun: nouns.slice(),
                    adjective: adjectives.slice(),
                    title: titles.slice()
                },
                name = '',
                i = 0,
                tryReplacement = function (match) {
                    var result;

                    match = match.replace(/<|>/g, '');
                    result = options[match][Math.floor(Math.random() * options[match].length)];

                    if (result.length === 0) {
                        return 'ERROR_PATTERN';
                    }

                    while (result.charAt(0) === ' ') {
                        result = result.substr(1);
                    }
                    while (result.charAt(result.length) === ' ') {
                        result = result.slice(0, -1);
                    }

                    return result.capitalize();
                };

            // Try to get result for random patterns, stop after 100 attempts. 
            while (name.length === 0 && i < 500) {
                i += 1;
                name = patterns[Math.floor(Math.random() * patterns.length)];
                name = name.replace(/<([\w\W]*?)>/g, tryReplacement);

                if (name.indexOf('ERROR_PATTERN') > -1 ||
                        name.toLocaleLowerCase().substr(0, startWith.length) !== startWith.toLocaleLowerCase() ||
                        name.toLocaleLowerCase().substr(name.length - endWith.length) !== endWith.toLocaleLowerCase() ||
                        (typeof contains !== 'undefined' && name.toLocaleLowerCase().indexOf(contains.toLocaleLowerCase()) === -1) ||
                        (typeof doesntContains !== 'undefined' && doesntContains.length > 0 && name.toLocaleLowerCase().indexOf(doesntContains.toLocaleLowerCase()) > -1)) {

                    name = '';
                }
            }

            return name;
        },
        getNouns: function () {
            return nouns;
        },
        getAdjectives: function () {
            return adjectives;
        },
        getTitles: function () {
            return titles;
        },
        setNouns: function (n) {
            nouns = n;
        },
        setAdjectives: function (a) {
            adjectives = a;
        },
        setTitles: function (t) {
            titles = t;
        },
        setDefaultValues: function () {
            nouns = defaultValues.nouns;
            adjectives = defaultValues.adjectives;
            titles = defaultValues.titles;
        }
    };

}]);
