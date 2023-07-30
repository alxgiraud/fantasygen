/*global app*/
app.factory('fantasticSpeciesGenerator', [function () {
    'use strict';

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    function isVowel(c) {
        return (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u');
    }

    var names = {
        vileAndCrude: {
            small: ['ach', 'adz', 'ak', 'ark', 'az', 'balg', 'bilg', 'blid', 'blig', 'blok', 'blot', 'bolg', 'bot', 'bug', 'burk', 'dokh', 'drik', 'driz', 'duf', 'flug', 'ga', 'gad', 'gag', 'gah', 'gak', 'gar', 'gat', 'gaz', 'ghag', 'ghak', 'git', 'glag', 'glak', 'glat', 'glig', 'gliz', 'glok', 'gnat', 'gog', 'grak', 'grat', 'guk', 'hig', 'irk', 'kak', 'khad', 'krig', 'lag', 'lak', 'lig', 'likk', 'loz', 'luk', 'mak', 'maz', 'miz', 'mub', 'nad', 'nag', 'naz', 'nig', 'nikk', 'nogg', 'nok', 'nukk', 'rag', 'rak', 'rat', 'rok', 'shrig', 'shuk', 'skrag', 'skug', 'slai', 'slig', 'slog', 'sna', 'snag', 'snark', 'snat', 'snig', 'snik', 'snit', 'sog', 'spik', 'stogg', 'tog', 'urf', 'vark', 'yad', 'yagg', 'yak', 'yark', 'yarp', 'yig', 'yip', 'zat', 'zib', 'zit', 'ziz'],
            medium: ['ag', 'aug', 'bad', 'bag', 'bakh', 'bash', 'baz', 'blag', 'brag', 'brog', 'bruz', 'dag', 'dakk', 'darg', 'dob', 'dog', 'drab', 'dug', 'dur', 'gash', 'ghaz', 'glakh', 'glaz', 'glob', 'glol', 'gluf', 'glur', 'gnarl', 'gnash', 'gnub', 'gob', 'gokh', 'gol', 'golk', 'gor', 'grakh', 'grash', 'grath', 'graz', 'grot', 'grub', 'grud', 'gud', 'gut', 'hag', 'hakk', 'hrat', 'hrog', 'hrug', 'khag', 'khar', 'krag', 'krud', 'lakh', 'lash', 'lob', 'lub', 'lud', 'luf', 'luk', 'molk', 'muk', 'muz', 'nar', 'ogg', 'olg', 'rag', 'rash', 'rogg', 'rorg', 'rot', 'rud', 'ruft', 'rug', 'rut', 'shad', 'shag', 'shak', 'shaz', 'shog', 'skar', 'skulg', 'slur', 'snar', 'snorl', 'snub', 'snurr', 'sod', 'stulg', 'thak', 'trog', 'ug', 'umsh', 'ung', 'uth', 'yakh', 'yash', 'yob', 'zahk', 'zog'],
            large: ['argh', 'barsh', 'bog', 'burz', 'dof', 'drok', 'drub', 'drug', 'dub', 'dug', 'dul', 'dursh', 'dush', 'duz', 'faug', 'fug', 'ghakh', 'ghar', 'ghash', 'ghol', 'ghor', 'ghukk', 'ghul', 'glub', 'glud', 'glug', 'gluz', 'gom', 'grad', 'grash', 'grob', 'grogg', 'grok', 'grol', 'gru', 'gruf', 'gruk', 'grul', 'grum', 'grumf', 'grut', 'gruz', 'guhl', 'gulv', 'hai', 'hrung', 'hur', 'hurg', 'kai', 'klob', 'krod', 'kug', 'kulk', 'kur', 'lorg', 'lug', 'lukh', 'lum', 'lurz', 'lush', 'luz', 'makh', 'maug', 'molg', 'mud', 'mug', 'mul', 'murk', 'muzd', 'nakh', 'narg', 'obb', 'rolb', 'rukh', 'ruz', 'sharg', 'shruf', 'shud', 'shug', 'shur', 'shuz', 'slub', 'slud', 'slug', 'snad', 'snog', 'thrag', 'thulk', 'thurk', 'trug', 'ulg', 'ur', 'urd', 'urgh', 'urkh', 'uz', 'yug', 'yur', 'zud', 'zug']
        },
        primitive: {
            names: ['ahg', 'baod', 'beegh', 'bohr', 'bul', 'buli', 'burh', 'buri', 'chah', 'dhak', 'digri', 'dum', 'eghi', 'ehm', 'faogh', 'feehm', 'ghad', 'ghah', 'gham', 'ghan', 'ghat', 'ghaw', 'ghee', 'ghish', 'ghug', 'giree', 'gonkh', 'goun', 'goush', 'guh', 'gunri', 'hah', 'hani', 'haogh', 'hatoo', 'heghi', 'heh', 'hoo', 'houm', 'hree', 'ig', 'kham', 'khan', 'khaz', 'khee', 'khem', 'khuri', 'logh', 'lugh', 'maoh', 'meh', 'mogh', 'mouh', 'mugh', 'naoh', 'naroo', 'nham', 'nuh', 'ob', 'oli', 'orf', 'ough', 'ouh', 'peh', 'pogh', 'pugh', 'puh', 'quagi', 'rahoo', 'rhoo', 'rifoo', 'ronkh', 'rouk', 'saom', 'saori', 'shehi', 'shlo', 'shom', 'shour', 'shul', 'snaoh', 'suhi', 'suth', 'teb', 'thom', 'toudh', 'tregh', 'tuhli', 'ub', 'urush', 'ush', 'vuh', 'wah', 'wuh', 'yaum', 'yauth', 'yeeh', 'yih', 'yuh', 'zham'],
            suffixes: ['doh', 'rei', 'mih', 'fah', 'soh', 'lah', 'tih', 'daoh']
        },
        doughty: {
            syllabes: ['bal', 'durn', 'na', 'bord', 'from', 'nor', 'born', 'fror', 'nord', 'brim', 'fuld', 'orm', 'brod', 'fund', 'skand', 'brokk', 'gim', 'skond', 'brom', 'glo', 'storn', 'bru', 'gond', 'strom', 'bur', 'gord', 'stur', 'burl', 'gorm', 'sturl', 'da', 'grad', 'sund', 'dal', 'grim', 'thor', 'dolg', 'grod', 'thorn', 'dor', 'grom', 'thra', 'dorm', 'guld', 'thro', 'dral', 'gund', 'throl', 'drim', 'gur', 'thror', 'drom', 'hord', 'thru', 'dur', 'horn', 'thrur', 'durm', 'hra', 'thund'],
            maleSuffixes: ['bor', 'din', 'in', 'in', 'in', 'ir', 'li', 'li', 'lin', 'nir', 'or', 'ri', 'ri', 'rin', 'rok', 'ror', 'rur', 'vi', 'vir', 'vor'],
            femaleSuffixes: ['bis', 'da', 'dis', 'dis', 'dis', 'dis', 'ga', 'hild', 'is', 'is', 'lif', 'lind', 'lis', 'na', 'nis', 'ris', 'rith', 'run', 'run', 'vis']
        },
        homely: {
            syllabes: ['ad', 'blanc', 'falc', 'mil', 'adel', 'boff', 'ferd', 'mung', 'adr', 'bomb', 'frob', 'od', 'ail', 'bram', 'fulb', 'oth', 'alb', 'bung', 'gam', 'sab', 'alm', 'droc', 'hald', 'sam', 'amb', 'drog', 'ham', 'seg', 'band', 'durl', 'hasc', 'serl', 'bard', 'emm', 'hod', 'tob', 'ben', 'erd', 'hug', 'wan', 'biff', 'ern', 'iv', 'wig', 'bild', 'ever', 'mark', 'wyd'],
            maleSuffixes: ['ald', 'ard', 'ert', 'fast', 'o', 'o', 'o', 'o', 'o', 'old', 'win', 'wise'],
            femaleSuffixes: ['a', 'a', 'a', 'a', 'a', 'ia', 'ia', 'ice', 'ily', 'ina', 'wina', 'wisa']
        },
        familyName: {
            english: ['Adshead', 'Akers', 'Antell', 'Applegarth', 'Babb', 'Babbs', 'Baffin', 'Bagg', 'Baggett', 'Bagnall', 'Baldey', 'Bamber', 'Bark', 'Barling', 'Barnstable', 'Barraclough', 'Bastable', 'Bastin', 'Bather', 'Batkin', 'Batt', 'Bazley', 'Bebb', 'Beddall', 'Beeby', 'Beecroft', 'Beedell', 'Bellis', 'Belsey', 'Berridge', 'Besley', 'Bibby', 'Bickle', 'Biddle', 'Biddulph', 'Bigg', 'Binks', 'Binns', 'Bisp', 'Biss', 'Blenk', 'Blenkin', 'Boam', 'Bobo', 'Boddington', 'Boffey', 'Bonger', 'Bonney', 'Bonser', 'Borrett', 'Bossey', 'Botterill', 'Botting', 'Bottom', 'Bottomley', 'Botwright', 'Bowser', 'Bracher', 'Brasnett', 'Brayley', 'Breary', 'Brickwood', 'Brindley', 'Broadfoot', 'Broadribb', 'Brocksopp', 'Broster', 'Buckmaster', 'Budge', 'Buffard', 'Bugg', 'Buggy', 'Bulger', 'Bulman', 'Bunce', 'Bunt', 'Burrow', 'Bushby', 'Buss', 'Cade', 'Cadwaller', 'Cantrill', 'Cardno', 'Catlow', 'Cattermole', 'Chaffe', 'Chaffer', 'Chard', 'Chettle', 'Chilcott', 'Chitty', 'Chivers', 'Chubb', 'Chugg', 'Clewes', 'Coaker', 'Cobden', 'Cobley', 'Coggan', 'Coggins', 'Collop', 'Coney', 'Coote', 'Copp', 'Coppard', 'Cornock', 'Cossey', 'Cottle', 'Coultip', 'Crang', 'Crimp', 'Croom', 'Crowles', 'Cubitt', 'Cullimore', 'Cuss', 'Custance', 'Cuthbert', 'Dabbin', 'Dabbing', 'Dabbs', 'Dagg', 'Dainty', 'Deeley', 'Derrick', 'Dibb', 'Dibble', 'Diccox', 'Diggins', 'Diggle', 'Diggles', 'Digweed', 'Dimmock', 'Dinsdale', 'Dipple', 'Dobbie', 'Dobby', 'Doggett', 'Dorey', 'Drabble', 'Draycott', 'Dring', 'Drudge', 'Duffield', 'Dufty', 'Duggan', 'Duggleby', 'Dumbrell', 'Dunkley', 'Eatwell', 'Eggins', 'Entwistle', 'Erlam', 'Etchells', 'Fairclough', 'Felgate', 'Fensome', 'Fenton', 'Fidge', 'Fidoe', 'Figg', 'Filer', 'Fincham', 'Firkins', 'Flann', 'Flanner', 'Flippance', 'Flook', 'Flunder', 'Followes', 'Fooks', 'Fremlin', 'Frisby', 'Frogley', 'Frohock', 'Froome', 'Frow', 'Fuggle', 'Furse', 'Furze', 'Gabb', 'Gaffey', 'Gagg', 'Gander', 'Garbutt', 'Garlick', 'Garn', 'Gazard', 'Gedge', 'Giblett', 'Giddy', 'Gigg', 'Gilliat', 'Gimble', 'Gimson', 'Ginger', 'Gipps', 'Girdler', 'Gissing', 'Gleave', 'Goggin', 'Gollogly', 'Gomm', 'Goodier', 'Gook', 'Gorringe', 'Gorwyn', 'Gosden', 'Gribble', 'Grigg', 'Griggs', 'Grill', 'Grimble', 'Grimes', 'Grimshaw', 'Grist', 'Grubb', 'Guckeen', 'Guckian', 'Guild', 'Gull', 'Gully', 'Gumbold', 'Gummer', 'Gummidge', 'Gurden', 'Haffenden', 'Hales', 'Halse', 'Harpham', 'Hartle', 'Hatch', 'Hayhurst', 'Hearle', 'Henley', 'Henwood', 'Heppell', 'Herrick', 'Herring', 'Hesketh', 'Hext', 'Hicken', 'Hickmott', 'Higman', 'Hinchcliffe', 'Hindmarsh', 'Hobley', 'Hoddy', 'Hogben', 'Holdom', 'Hollick', 'Holtom', 'Honeysett', 'Hook', 'Hopley', 'Hopps', 'Horrocks', 'Horsfall', 'Horwood', 'Hotten', 'Housely', 'Howie', 'Huff', 'Huffam', 'Hutton', 'Huxtable', 'Icke', 'Idden', 'Inskip', 'Iveson', 'Izzard', 'Jaggs', 'Jellis', 'Jepson', 'Jesty', 'Keel', 'Keetley', 'Kerkin', 'Kerslake', 'Kettley', 'Killick', 'Kinch', 'Knaggs', 'Kneebone', 'Knopp', 'Knott', 'Lagden', 'Laslett', 'Laverick', 'Leaper', 'Leggett', 'Liddane', 'Liddy', 'Liggan', 'Lithgoe', 'Lobb', 'Lodder', 'Looby', 'Loody', 'Lubbock', 'Luff', 'Lugard', 'Lugg', 'Lumsden', 'Lyle', 'Mabb', 'Mabbitt', 'Mabbot', 'Mabbs', 'Mabbutt', 'Maffey', 'Mallam', 'Mangold', 'Mapp', 'Mappin', 'Marfell', 'Matthams', 'Maunder', 'Maxted', 'Mayo', 'Meech', 'Meeson', 'Meggison', 'Meggitt', 'Meggs', 'Mellings', 'Merrikin', 'Metherell', 'Mew', 'Miggles', 'Miggs', 'Milsom', 'Milson', 'Minchin', 'Minns', 'Mobbs', 'Moberly', 'Mockler', 'Mogford', 'Mogg', 'Moggs', 'Morkam', 'Morphett', 'Mossman', 'Mossop', 'Mottershead', 'Moulds', 'Muddle', 'Muddock', 'Mudge', 'Mullock', 'Murch', 'Murfin', 'Murfitt', 'Musson', 'Mustill', 'Mutter', 'Mutton', 'Nance', 'Napper', 'Neep', 'Negus', 'Netherway', 'Newitt', 'Niblett', 'Nickless', 'Noad', 'Nobbs', 'Noblet', 'Nosworthy', 'Nottage', 'Nutt', 'Offen', 'Oram', 'Orcutt', 'Ord', 'Orpe', 'Paddock', 'Paddon', 'Pannell', 'Parham', 'Pavey', 'Peay', 'Peever', 'Pegg', 'Pegge', 'Pegler', 'Pegrum', 'Pelly', 'Pelter', 'Pendle', 'Petch', 'Petcher', 'Petchey', 'Pettipher', 'Philp', 'Phippen', 'Phippin', 'Pickersgill', 'Pickley', 'Pickwell', 'Pidduck', 'Pigg', 'Pilkington', 'Pimblett', 'Pingree', 'Pinch', 'Pinn', 'Pither', 'Pochin', 'Poggs', 'Polkinghorne', 'Pomeroy', 'Pomfret', 'Postlethwaite', 'Potticary', 'Poxon', 'Pring', 'Pringle', 'Prisk', 'Proudfoot', 'Puddicombe', 'Pudding', 'Puddy', 'Pugsley', 'Purslove', 'Pym', 'Quaife', 'Quain', 'Quenby', 'Quibell', 'Quigg', 'Raddle', 'Ranby', 'Rapkins', 'Ratter', 'Reakes', 'Reeson', 'Riddle', 'Rix', 'Roddis', 'Rosser', 'Ruddle', 'Ruffle', 'Rugg', 'Rumming', 'Rump', 'Sadd', 'Samways', 'Sankey', 'Scantlebury', 'Scoones', 'Scouse', 'Scragg', 'Scrimgeour', 'Scroggs', 'Scruby', 'Scutt', 'Sefton', 'Selth', 'Semmens', 'Seward', 'Shalloo', 'Sharples', 'Siggers', 'Sirett', 'Skeels', 'Skerrett', 'Slee', 'Sluggett', 'Smedley', 'Snoddy', 'Snuggs', 'Sparrow', 'Sparrowhawke', 'Spink', 'Spinks', 'Spriggs', 'Springett', 'Sproat', 'Sprunt', 'Spurle', 'Spurrett', 'Spurrier', 'Squance', 'Squarey', 'Squibb', 'Squirrel', 'Staines', 'Steggal', 'Stelfox', 'Stirk', 'Stith', 'Strag', 'Straw', 'Strutt', 'Stubbins', 'Stuppies', 'Suggett', 'Swaffer', 'Swaffield', 'Swarbrick', 'Symes', 'Tabor', 'Tagg', 'Tapping', 'Tarr', 'Tassell', 'Teale', 'Thew', 'Thick', 'Thornber', 'Thwaites', 'Tibbins', 'Tibbits', 'Tibbles', 'Tibbotts', 'Tink', 'Tippell', 'Tipping', 'Tippins', 'Tippling', 'Tipton', 'Tisser', 'Tittmuss', 'Tobitt', 'Tonks', 'Topping', 'Towse', 'Toye', 'Tozer', 'Trafford', 'Treasure', 'Tremlett', 'Trett', 'Trible', 'Tricker', 'Tripe', 'Trippe', 'Tripper', 'Trist', 'Troake', 'Trotter', 'Trouncer', 'Trumble', 'Tudge', 'Tuffin', 'Tufley', 'Tulk', 'Tully', 'Tumman', 'Tunks', 'Tunnah', 'Tunnicliffe', 'Turnock', 'Tween', 'Tyrer', 'Unsworth', 'Uttley', 'Varney', 'Vooght', 'Wackrill', 'Waddilove', 'Waddilow', 'Walthew', 'Waltho', 'Walwin', 'Wanless', 'Wann', 'Waple', 'Waring', 'Warrilow', 'Welburn', 'Wenden', 'Werrett', 'Wescott', 'Whinnett', 'Whiskard', 'Whisker', 'Whitefoot', 'Whitlow', 'Wibberley', 'Widdicombe', 'Widdows', 'Widdup', 'Wigg', 'Wigley', 'Wilberforce', 'Wilmer', 'Wintle', 'Witherden', 'Witney', 'Witter', 'Wolnoth', 'Woodhead', 'Wookey', 'Woolland', 'Woombill', 'Worrel', 'Worsley', 'Wortley', 'Wragg', 'Wrixon', 'Yeandle', 'Yeend', 'Yemm', 'Yould'],
            scottish: ['Aiken', 'Aitken', 'Baikie', 'Baillie', 'Bainbridge', 'Baird', 'Bairnsfeather', 'Balios', 'Balnaves', 'Barbour', 'Barclay', 'Barrie', 'Beattie', 'Beilby', 'Bell', 'Bellenden', 'Berwick', 'Blackie', 'Blackwood', 'Blaikie', 'Blair', 'Bogue', 'Boyce', 'Braid', 'Brechin', 'Brisbane', 'Brough', 'Brougham', 'Brown', 'Brownlee', 'Brymner', 'Cairns', 'Calderwood', 'Candlish', 'Cardus', 'Cargill', 'Caven', 'Christison', 'Clyde', 'Cochran', 'Cochrane', 'Cockburn', 'Colomb', 'Crockett', 'Cronin', 'Cruden', 'Cunningham', 'Cushny', 'Dalziel', 'Deems', 'Dempster', 'Dinwiddie', 'Doohan', 'Doone', 'Dunbar', 'Dundas', 'Dundee', 'Dunn', 'Dunning', 'Eccles', 'Eckford', 'Edmonstone', 'Elder', 'Fairbairn', 'Falconer', 'Fenwick', 'Ferrier', 'Gairdner', 'Galloway', 'Galt', 'Geddes', 'Geikie', 'Glass', 'Glendon', 'Graham', 'Gregory', 'Guthrie', 'Haig', 'Halkett', 'Herdman', 'Hogg', 'Imey', 'Inchbald', 'Inglis', 'Irvine', 'Ivory', 'Jebb', 'Kerr', 'Kircaldy', 'Kirk', 'Kirkbride', 'Laird', 'Laughlin', 'Lawson', 'Legge', 'Lillie', 'Lipton', 'Lockhart', 'Lorimer', 'Lyall', 'Lyte', 'Masson', 'Melrose', 'Mill', 'Miller', 'Milligan', 'Milner', 'Moffat', 'Mollison', 'Moncrief', 'Montrose', 'Motherwell', 'Muir', 'Muirhead', 'Murray', 'Nairn', 'Naysmith', 'Nesbit', 'Nisbet', 'Noël', 'Orchardson', 'Pasley', 'Paterson', 'Pender', 'Preston', 'Primrose', 'Pringle', 'Quiller', 'Raeburn', 'Ransay', 'Redpath', 'Renfrew', 'Rennie', 'Renwick', 'Sanderson', 'Semphill', 'Smiles', 'Smollett', 'Smybert', 'Spenlove', 'Sterling', 'Stirling', 'Strang', 'Strange', 'Strangeways', 'Tait', 'Tannahill', 'Tassie', 'Thom', 'Tolmie', 'Urquhart', 'Wardlaw', 'Wedderburn', 'Whearty', 'Wilkie', 'Wiseheart', 'Wishart', 'Yarrow']
        },
        fairAndNoble: {
            elfprefixes: ['an', 'im', 'ar', 'in', 'cal', 'ir', 'car', 'ist', 'cel', 'lar', 'cir', 'lir', 'clar', 'lor', 'el', 'mar', 'elb', 'mel', 'er', 'mer', 'erl', 'mir', 'est', 'nim', 'far', 'nin', 'fin', 'nir', 'gal', 'ral', 'gan', 'ran', 'gar', 'rel', 'gel', 'ril', 'gil', 'rin', 'ilm', 'rim'],
            alternativeElfPrefixes: ['aeg', 'lith', 'ael', 'maeg', 'aer', 'mind', 'aes', 'mith', 'aeth', 'nith', 'bel', 'rael', 'ber', 'rind', 'cael', 'saer', 'caer', 'sar', 'cris', 'seld', 'ear', 'ser', 'elth', 'sil', 'eol', 'silm', 'faer', 'sind', 'fean', 'thael', 'find', 'thaer', 'ith', 'thal', 'laeg', 'thel', 'lend', 'ther', 'lind', 'thir'],
            middle: ['ad', 'al', 'am', 'an', 'ar', 'as', 'eb', 'ed', 'el', 'em', 'en', 'er', 'es', 'ev', 'il', 'in', 'ir', 'ol', 'thal', 'thon'],
            maleSuffixes: ['ad', 'dan', 'del', 'dil', 'dir', 'fal', 'ion', 'ion', 'lad', 'las', 'lin', 'nar', 'or', 'orn', 'ras', 'rior', 'rod', 'rond', 'ros', 'thir'],
            femaleSuffixes: ['edel', 'el', 'eth', 'ian', 'iel', 'iel', 'ien', 'loth', 'mir', 'rial', 'rian', 'riel', 'riel', 'rien', 'ril', 'roël', 'sil', 'wë', 'wen', 'wen']
        },
        faerykind: {
            prefixes: ['dex', 'gliss', 'tink', 'flax', 'goss', 'tiss', 'flim', 'hex', 'trill', 'fliss', 'liss', 'trist', 'flix', 'min', 'twill', 'foss', 'misk', 'twiss', 'frisk', 'raff', 'twisp', 'friss', 'ress', 'twix', 'gess', 'riff', 'weft', 'glan', 'rill', 'wesk', 'glax', 'saff', 'winn', 'glim', 'shim', 'wisp'],
            maleSuffixes: ['aldo', 'allo', 'amo', 'ando', 'aroll', 'aron', 'asto', 'endo', 'eroll', 'eron', 'esto', 'ondo'],
            femaleSuffixes: ['afer', 'amer', 'anel', 'arel', 'asti', 'efer', 'enti', 'erel', 'ifer', 'imer', 'inel', 'irel']
        },
        alternativeFaerykind: {
            prefixes: ['bris', 'iphil', 'opal', 'cryl', 'ispel', 'oris', 'elsi', 'istle', 'orif', 'ember', 'jat', 'peri', 'esk', 'jost', 'sarm', 'feris', 'jus', 'sprin', 'frimi', 'lirra', 'stith', 'gan', 'mali', 'tansi', 'glink', 'mink', 'tirra', 'hal', 'mirra', 'trump', 'hel', 'mistle', 'whis', 'hist', 'ninka', 'zando'],
            maleSuffixes: ['bik', 'brix', 'frell', 'fret', 'kin', 'mist', 'mit', 'rix', 'tross', 'twik', 'win', 'zisk'],
            femaleSuffixes: ['dee', 'kiss', 'la', 'liss', 'mee', 'niss', 'nyx', 'ree', 'riss', 'sa', 'tiss', 'ynx']
        },
        elegantEvil: {
            prefixesDarkElves: ['bal', 'myr', 'ber', 'ne', 'char', 'nel', 'de', 'nil', 'div', 'no', 'dri', 'nyl', 'dul', 'rel', 'eil', 'rha', 'ek', 'ru', 'im', 'sab', 'ins', 'sin', 'ist', 'sul', 'jeg', 'sus', 'jer', 'tel', 'jys', 'tul', 'lil', 'ver', 'mar', 'vil', 'mer', 'vir', 'mez', 'vril', 'mor', 'yas'],
            prefixesAlternateDarkElves: ['bur', 'olg', 'chor', 'on', 'col', 'or', 'dol', 'org', 'dor', 'oth', 'drom', 'pan', 'dur', 'pel', 'en', 'por', 'er', 'sek', 'gon', 'sol', 'gul', 'sun', 'jend', 'ten', 'kil', 'thal', 'lul', 'tor', 'mab', 'torm', 'maz', 'vek', 'mol', 'vol', 'nor', 'vor', 'noth', 'yel', 'ol', 'yol'],
            middle: ['dyl', 'el', 'en', 'er', 'id', 'il', 'is', 'lav', 'len', 'lev', 'lin', 'liv', 'pel', 'pir', 'ra', 'ral', 'ril', 'rin', 'sin', 'syl'],
            maleSuffixes: ['ald', 'eld', 'id', 'ild', 'ird', 'lim', 'naz', 'nid', 'nil', 'nim', 'red', 'rid', 'rim', 'riv', 'ul', 'uld', 'vid', 'vim', 'vir', 'viz'],
            femaleSuffixes: ['bra', 'dra', 'dril', 'ene', 'hel', 'ia', 'il', 'iln', 'ira', 'istra', 'ith', 'iza', 'lin', 'na', 'ra', 'rin', 'sil', 'tra', 'vra', 'vril']
        },
        malevolent: {
            prefixes: ['aag', 'karg', 'ulthu', 'alur', 'khark', 'urz', 'arak', 'krau', 'uti', 'az', 'kriv', 'uznid', 'azik', 'kuaz', 'virn', 'bral', 'kudu', 'vlaaj', 'braz', 'luri', 'vlag', 'bruh', 'mulk', 'vlash', 'draan', 'nau', 'vluk', 'drulg', 'nid', 'vluzak', 'guz', 'ninj', 'vraz', 'haug', 'nul', 'vulk', 'idru', 'nym', 'xau', 'jhaal', 'ranag', 'xid', 'jid', 'rilthu', 'xul', 'jiu', 'ruk', 'xuraj', 'jur', 'rulk', 'zauv', 'jurg', 'ruz', 'zug', 'jurz', 'saag', 'zuldu', 'kaaz', 'skaur', 'zuv'],
            maleSuffixes: ['arag', 'bru', 'drul', 'inu', 'lank', 'lun', 'lurr', 'lurug', 'nal', 'rul', 'ruzuk', 'salk', 'sul', 'suruk', 'ull', 'undak', 'uvik', 'xulg', 'zu', 'zuk'],
            femaleSuffixes: ['anil', 'bau', 'diu', 'dusla', 'giu', 'ija', 'izil', 'jiul', 'lihyl', 'lin', 'lyrr', 'nalu', 'rhyl', 'rula', 'skiu', 'sula', 'ulla', 'xhiu', 'zihyl', 'ziu']
        },
        draconic: {
            prefixes: ['abra', 'har', 'phrixu', 'adastra', 'helio', 'porphyro', 'adra', 'huro', 'pyra', 'anca', 'iul', 'rhada', 'andra', 'jalan', 'rhe', 'arag', 'jarzem', 'rhodo', 'archo', 'jazra', 'rau', 'atra', 'jurga', 'sar', 'bar', 'keruxa', 'sarcu', 'bara', 'kralka', 'sarda', 'beru', 'lazulo', 'scarva', 'bhakri', 'majuri', 'sidereo', 'bia', 'malacho', 'skhia', 'bra', 'mar', 'sulchru', 'brado', 'marmora', 'tchalcedo', 'brima', 'melkar', 'tchazar', 'cadra', 'orgra', 'trocho', 'chro', 'ouro', 'vra', 'chryso', 'perido', 'zalar', 'glau', 'phoro', 'zerul'],
            suffixes: ['bazius', 'boros', 'bradax', 'calchax', 'cordax', 'lagon', 'malax', 'mandros', 'manthys', 'mordax', 'nadral', 'nalux', 'neriax', 'phylax', 'vorax', 'vorung', 'xenor', 'zuthrax', 'zzebrax', 'zzemal']
        },
        infernal: {
            softs: ['alu', 'alz', 'avu', 'azaz', 'baph', 'baz', 'cha', 'fraz', 'garl', 'garu', 'gla', 'hra', 'mal', 'nahu', 'nal', 'nasu', 'paz', 'raz', 'tha', 'thalu', 'bre', 'dre', 'gel', 'gle', 'gre', 'hez', 'rez', 'rezu', 'tze', 'gzi', 'hriz', 'hzi', 'idrau', 'itha', 'ixu', 'lilu', 'riz', 'yil', 'dromu', 'gro', 'lol', 'moz', 'olth', 'oxu', 'sco', 'tho', 'bu', 'bul', 'buz', 'chru', 'dru', 'ghu', 'gura', 'guz', 'hruz', 'huz', 'kul', 'lurhz', 'muz', 'ru', 'shu', 'ssu', 'szul', 'thu', 'ulchru', 'utu', 'vul', 'zu', 'zul', 'baal', 'ghaa', 'kraa', 'phaal', 'raal', 'saa', 'bial', 'oazo', 'soaz', 'ruaz', 'gya', 'yaa', 'bael', 'nee', 'ziel', 'yee', 'aiaz', 'shai', 'reoz', 'duoi', 'drau', 'ghau', 'glau', 'mau', 'sau', 'tzau', 'iuz', 'juu', 'rhuu', 'vuul', 'zuu'],
            dulls: ['agh', 'alg', 'barg', 'chag', 'ghad', 'glab', 'grag', 'hrag', 'kag', 'kwarg', 'mag', 'nalb', 'sag', 'tharg', 'brelg', 'dergh', 'dregh', 'drelb', 'felg', 'heg', 'kleg', 'igg', 'rigg', 'blog', 'drog', 'grolb', 'kolg', 'krolg', 'lolg', 'mog', 'morg', 'nog', 'obb', 'ogg', 'olb', 'rogg', 'strog', 'thog', 'trob', 'tzolg', 'vogt', 'bub', 'bulg', 'druj', 'durg', 'frub', 'fulg', 'gub', 'hrud', 'hurg', 'jub', 'julb', 'nud', 'nug', 'nulb', 'rung', 'shub', 'stug', 'sug', 'szug', 'trulg', 'ulb', 'urb', 'vub', 'vulb', 'xub', 'zub', 'zug', 'zugt', 'aab', 'aag', 'glaag', 'haag', 'naag', 'raag', 'boaj', 'moab', 'uag', 'leegh', 'yeb', 'yeeg', 'aig', 'yibb', 'iog', 'droog', 'nyog', 'aug', 'baug', 'daurg', 'draug', 'gaub', 'laug', 'maug', 'naug', 'raug', 'saug', 'thaug', 'iub', 'iug', 'ruug'],
            sharps: ['ach', 'akk', 'ash', 'azt', 'bahor', 'bar', 'bas', 'brax', 'charn', 'dak', 'hrax', 'lach', 'lazt', 'mat', 'nam', 'nazt', 'ralk', 'rhast', 'sark', 'slarv', 'tash', 'thak', 'thalur', 'thalk', 'vach', 'vap', 'dek', 'ech', 'fesh', 'gek', 'hrek', 'lech', 'met', 'ner', 'ter', 'blik', 'gith', 'igm', 'inax', 'irsch', 'kir', 'lis', 'lisk', 'lith', 'nilv', 'nirr', 'tlizit', 'bor', 'chon', 'goch', 'gor', 'goth', 'hoth', 'khor', 'kos', 'loch', 'lok', 'loth', 'moch', 'moth', 'noc', 'och', 'oth', 'rolk', 'roth', 'sot', 'soth', 'vrok', 'dun', 'gur', 'hun', 'luth', 'muth', 'nur', 'rutt', 'sut', 'sutt', 'szut', 'tur', 'urt', 'utuk', 'uzt', 'krych', 'nyth', 'slyth', 'gaan', 'xaas', 'boak', 'ruaak', 'yalm', 'haerx', 'iex', 'draum', 'gaur', 'glaur', 'rauk', 'saur', 'duum', 'nuur', 'ruun']
        },
        empyreal: {
            prefixes: ['adan', 'asan', 'jasan', 'palant', 'sarnat', 'valmar', 'adrast', 'asarn', 'jasarm', 'palor', 'solar', 'valnar', 'alant', 'astar', 'javral', 'raman', 'talan', 'valnor', 'amad', 'atar', 'kalad', 'ranal', 'talar', 'valon', 'aman', 'atlan', 'kalar', 'ranar', 'talas', 'valor', 'amar', 'avar', 'kalas', 'rasan', 'talon', 'vanar', 'amars', 'avlant', 'kalast', 'ravan', 'taran', 'varal', 'amart', 'avral', 'kasal', 'samar', 'taval', 'varam', 'ansam', 'jalan', 'katarn', 'saran', 'valant', 'varan', 'arad', 'jalkar', 'kaval', 'sarat', 'valar', 'varat', 'aram', 'jaran', 'klaron', 'sardan', 'valdor', 'vardar', 'aran', 'jasal', 'palad', 'sardar', 'valkar', 'voltar'],
            maleSuffixes: ['al', 'an', 'ar', 'as', 'at', 'ath', 'ath', 'ath', 'anth', 'athal', 'athar', 'athas'],
            femaleSuffixes: ['el', 'en', 'er', 'es', 'et', 'eth', 'eth', 'eth', 'enth', 'eleth', 'ereth', 'eseth'],
            titles: ['ar-', 'sar-', 'tar-', 'var-', 'jal-', 'kal-', 'pal-', 'ral-', 'tal-']
        }
    };

    return {
        getGoblinName: function () {
            return names.vileAndCrude.small[Math.floor(Math.random() * names.vileAndCrude.small.length)].capitalize() +
                names.vileAndCrude.small[Math.floor(Math.random() * names.vileAndCrude.small.length)];
        },
        getOrcName: function () {
            return names.vileAndCrude.medium[Math.floor(Math.random() * names.vileAndCrude.medium.length)].capitalize() +
                names.vileAndCrude.medium[Math.floor(Math.random() * names.vileAndCrude.medium.length)];
        },
        getOgreName: function () {
            return names.vileAndCrude.large[Math.floor(Math.random() * names.vileAndCrude.large.length)].capitalize() +
                names.vileAndCrude.large[Math.floor(Math.random() * names.vileAndCrude.large.length)];
        },
        getMaleCavemenName: function () {
            var d10 = Math.floor(Math.random() * 10) + 1,
                name = names.primitive.names[Math.floor(Math.random() * names.primitive.names.length)].capitalize();

            if (d10 > 3) {
                name += '-' + names.primitive.names[Math.floor(Math.random() * names.primitive.names.length)].capitalize();
            }

            if (d10 > 8) {
                name += '-' + names.primitive.names[Math.floor(Math.random() * names.primitive.names.length)].capitalize();
            }

            return name;
        },
        getFemaleCavemenName: function () {
            var name = names.primitive.names[Math.floor(Math.random() * names.primitive.names.length)].capitalize();
            if (Math.random() >= 0.5) {
                name += '-' + names.primitive.names[Math.floor(Math.random() * names.primitive.names.length)].capitalize();
            }
            name += '-' + names.primitive.suffixes[Math.floor(Math.random() * names.primitive.suffixes.length)].capitalize();

            return name;
        },
        getMaleDwarfName: function () {
            var name = names.doughty.syllabes[Math.floor(Math.random() * names.doughty.syllabes.length)].capitalize();

            if (Math.random() > 0.8) {
                name += (isVowel(name.slice(-1))) ? 'r' : 'i';
            } else {
                name += names.doughty.maleSuffixes[Math.floor(Math.random() * names.doughty.maleSuffixes.length)];
            }

            return name;
        },
        getFemaleDwarfName: function () {
            var name = names.doughty.syllabes[Math.floor(Math.random() * names.doughty.syllabes.length)].capitalize();

            if (Math.random() > 0.8) {
                name += (isVowel(name.slice(-1))) ? 'ra' : 'a';
            } else {
                name += names.doughty.femaleSuffixes[Math.floor(Math.random() * names.doughty.femaleSuffixes.length)];
            }

            return name;
        },
        getMaleHalflingName: function () {
            var name = names.homely.syllabes[Math.floor(Math.random() * names.homely.syllabes.length)].capitalize() +
                names.homely.maleSuffixes[Math.floor(Math.random() * names.homely.maleSuffixes.length)];

            if (Math.random() > 0.7) {
                name += ' ' + names.familyName.english[Math.floor(Math.random() * names.familyName.english.length)];
            }

            return name;
        },
        getFemaleHalflingName: function () {
            var name = names.homely.syllabes[Math.floor(Math.random() * names.homely.syllabes.length)].capitalize() +
                names.homely.femaleSuffixes[Math.floor(Math.random() * names.homely.femaleSuffixes.length)];

            if (Math.random() > 0.7) {
                name += ' ' + names.familyName.english[Math.floor(Math.random() * names.familyName.english.length)];
            }

            return name;
        },
        geMaleGnomeName: function () {
            var name = names.doughty.syllabes[Math.floor(Math.random() * names.doughty.syllabes.length)].capitalize();

            if (isVowel(name.slice(-1))) {
                name += 'l';
            }

            name += names.homely.maleSuffixes[Math.floor(Math.random() * names.homely.maleSuffixes.length)];

            if (Math.random() > 0.7) {
                name += ' ' + names.familyName.scottish[Math.floor(Math.random() * names.familyName.scottish.length)];
            }

            return name;
        },
        getFemaleGnomeName: function () {
            var name = names.doughty.syllabes[Math.floor(Math.random() * names.doughty.syllabes.length)].capitalize();

            if (isVowel(name.slice(-1))) {
                name += 'l';
            }

            name += names.homely.femaleSuffixes[Math.floor(Math.random() * names.homely.femaleSuffixes.length)];

            if (Math.random() > 0.7) {
                name += ' ' + names.familyName.scottish[Math.floor(Math.random() * names.familyName.scottish.length)];
            }

            return name;
        },
        getMaleElfName: function () {
            return names.fairAndNoble.elfprefixes[Math.floor(Math.random() * names.fairAndNoble.elfprefixes.length)].capitalize() +
                names.fairAndNoble.middle[Math.floor(Math.random() * names.fairAndNoble.middle.length)] +
                names.fairAndNoble.maleSuffixes[Math.floor(Math.random() * names.fairAndNoble.maleSuffixes.length)];
        },
        getFemaleElfName: function () {
            return names.fairAndNoble.elfprefixes[Math.floor(Math.random() * names.fairAndNoble.elfprefixes.length)].capitalize() +
                names.fairAndNoble.middle[Math.floor(Math.random() * names.fairAndNoble.middle.length)] +
                names.fairAndNoble.femaleSuffixes[Math.floor(Math.random() * names.fairAndNoble.femaleSuffixes.length)];
        },
        getAlternateMaleElfName: function () {
            return names.fairAndNoble.alternativeElfPrefixes[Math.floor(Math.random() * names.fairAndNoble.alternativeElfPrefixes.length)].capitalize() +
                names.fairAndNoble.middle[Math.floor(Math.random() * names.fairAndNoble.middle.length)] +
                names.fairAndNoble.femaleSuffixes[Math.floor(Math.random() * names.fairAndNoble.femaleSuffixes.length)];
        },
        getAlternateFemaleElfName: function () {
            return names.fairAndNoble.alternativeElfPrefixes[Math.floor(Math.random() * names.fairAndNoble.alternativeElfPrefixes.length)].capitalize() +
                names.fairAndNoble.middle[Math.floor(Math.random() * names.fairAndNoble.middle.length)] +
                names.fairAndNoble.maleSuffixes[Math.floor(Math.random() * names.fairAndNoble.maleSuffixes.length)];
        },
        getMaleFaerykindName: function () {
            return names.faerykind.prefixes[Math.floor(Math.random() * names.faerykind.prefixes.length)].capitalize() +
                names.faerykind.maleSuffixes[Math.floor(Math.random() * names.faerykind.maleSuffixes.length)];
        },
        getFemaleFaerykindName: function () {
            return names.faerykind.prefixes[Math.floor(Math.random() * names.faerykind.prefixes.length)].capitalize() +
                names.faerykind.femaleSuffixes[Math.floor(Math.random() * names.faerykind.femaleSuffixes.length)];
        },
        getAlternateMaleFaerykindName: function () {
            return names.alternativeFaerykind.prefixes[Math.floor(Math.random() * names.alternativeFaerykind.prefixes.length)].capitalize() +
                names.alternativeFaerykind.maleSuffixes[Math.floor(Math.random() * names.alternativeFaerykind.maleSuffixes.length)];
        },
        getAlternateFemaleFaerykindName: function () {
            return names.alternativeFaerykind.prefixes[Math.floor(Math.random() * names.alternativeFaerykind.prefixes.length)].capitalize() +
                names.alternativeFaerykind.femaleSuffixes[Math.floor(Math.random() * names.alternativeFaerykind.femaleSuffixes.length)];
        },
        getMaleDarkElfName: function () {
            var name = names.elegantEvil.prefixesDarkElves[Math.floor(Math.random() * names.elegantEvil.prefixesDarkElves.length)].capitalize();

            if (Math.random() > (1 / 6)) {
                name += names.elegantEvil.middle[Math.floor(Math.random() * names.elegantEvil.middle.length)];
            }

            name += names.elegantEvil.maleSuffixes[Math.floor(Math.random() * names.elegantEvil.maleSuffixes.length)];

            return name;
        },
        getFemaleDarkElfName: function () {
            var name = names.elegantEvil.prefixesDarkElves[Math.floor(Math.random() * names.elegantEvil.prefixesDarkElves.length)].capitalize();

            if (Math.random() > (1 / 6)) {
                name += names.elegantEvil.middle[Math.floor(Math.random() * names.elegantEvil.middle.length)];
            }

            name += names.elegantEvil.femaleSuffixes[Math.floor(Math.random() * names.elegantEvil.femaleSuffixes.length)];

            return name;
        },
        getAlternateMaleDarkElfName: function () {
            var name = names.elegantEvil.prefixesAlternateDarkElves[Math.floor(Math.random() * names.elegantEvil.prefixesAlternateDarkElves.length)].capitalize();

            if (Math.random() > (1 / 6)) {
                name += names.elegantEvil.middle[Math.floor(Math.random() * names.elegantEvil.middle.length)];
            }

            name += names.elegantEvil.maleSuffixes[Math.floor(Math.random() * names.elegantEvil.maleSuffixes.length)];

            return name;
        },
        getAlternateFemaleDarkElfName: function () {
            var name = names.elegantEvil.prefixesAlternateDarkElves[Math.floor(Math.random() * names.elegantEvil.prefixesAlternateDarkElves.length)].capitalize();

            if (Math.random() > (1 / 6)) {
                name += names.elegantEvil.middle[Math.floor(Math.random() * names.elegantEvil.middle.length)];
            }

            name += names.elegantEvil.femaleSuffixes[Math.floor(Math.random() * names.elegantEvil.femaleSuffixes.length)];

            return name;
        },
        getMaleHalfDemonName: function () {
            return names.malevolent.prefixes[Math.floor(Math.random() * names.malevolent.prefixes.length)].capitalize() +
                names.malevolent.maleSuffixes[Math.floor(Math.random() * names.malevolent.maleSuffixes.length)];
        },
        getFemaleHalfDemonName: function () {
            return names.malevolent.prefixes[Math.floor(Math.random() * names.malevolent.prefixes.length)].capitalize() +
                names.malevolent.femaleSuffixes[Math.floor(Math.random() * names.malevolent.femaleSuffixes.length)];
        },
        getMaleDragonName: function () {
            return names.draconic.prefixes[Math.floor(Math.random() * names.draconic.prefixes.length)].capitalize() +
                names.draconic.suffixes[Math.floor(Math.random() * names.draconic.suffixes.length)];
        },
        getFemaleDragonName: function () {
            var name = names.draconic.prefixes[Math.floor(Math.random() * names.draconic.prefixes.length)].capitalize(),
                suffix = names.draconic.suffixes[Math.floor(Math.random() * names.draconic.suffixes.length)];

            if (suffix === 'bazius') {
                suffix = 'bazia';
            } else if (suffix.slice(-2) === 'os') {
                suffix = suffix.slice(0, -2);
                suffix += 'ossa';
            } else {
                suffix += 'is';
            }

            return name + suffix;
        },
        getDemonName: function () {
            var d6 = Math.floor(Math.random() * 6) + 1,
                name;

            if (d6 === 1) {
                name = names.infernal.softs[Math.floor(Math.random() * names.infernal.softs.length)].capitalize() +
                    names.infernal.dulls[Math.floor(Math.random() * names.infernal.dulls.length)];
            } else if (d6 === 2) {
                name = names.infernal.softs[Math.floor(Math.random() * names.infernal.softs.length)].capitalize() +
                    names.infernal.sharps[Math.floor(Math.random() * names.infernal.sharps.length)];
            } else if (d6 === 3) {
                name = names.infernal.dulls[Math.floor(Math.random() * names.infernal.dulls.length)].capitalize() +
                    names.infernal.softs[Math.floor(Math.random() * names.infernal.softs.length)];
            } else if (d6 === 4) {
                name = names.infernal.dulls[Math.floor(Math.random() * names.infernal.dulls.length)].capitalize() +
                    names.infernal.sharps[Math.floor(Math.random() * names.infernal.sharps.length)];
            } else if (d6 === 5) {
                name = names.infernal.sharps[Math.floor(Math.random() * names.infernal.sharps.length)].capitalize() +
                    names.infernal.softs[Math.floor(Math.random() * names.infernal.softs.length)];
            } else {
                name = names.infernal.sharps[Math.floor(Math.random() * names.infernal.sharps.length)].capitalize() +
                    names.infernal.dulls[Math.floor(Math.random() * names.infernal.dulls.length)];
            }

            return name;
        },
        getMaleAngelName: function () {
            var name = names.empyreal.prefixes[Math.floor(Math.random() * names.empyreal.prefixes.length)].capitalize();

            if (Math.random() <= 1 / 12) {
                if (name.slice(-2) !== 'ar' && name.slice(-2) !== 'al') {
                    name = names.empyreal.titles[Math.floor(Math.random() * names.empyreal.titles.length)].capitalize() + name;

                } else if (name.slice(-2) === 'ar') {
                    name = names.empyreal.titles[Math.floor(Math.random() * 4) + 4].capitalize() + name;

                } else {
                    name = names.empyreal.titles[Math.floor(Math.random() * 4)].capitalize() + name;
                }

            } else {
                name += names.empyreal.maleSuffixes[Math.floor(Math.random() * names.empyreal.maleSuffixes.length)];
            }

            return name;
        },
        getFemaleAngelName: function () {
            var name = names.empyreal.prefixes[Math.floor(Math.random() * names.empyreal.prefixes.length)].capitalize();

            if (Math.random() <= 1 / 12) {
                name = name.substr(0, name.lastIndexOf('a')) + 'e' + name.substr(name.lastIndexOf('a') + 1); // Replace the last 'a' by a 'e' for female
                
                if (name.slice(-2) !== 'ar' && name.slice(-2) !== 'al') {
                    name = names.empyreal.titles[Math.floor(Math.random() * names.empyreal.titles.length)].capitalize() + name;

                } else if (name.slice(-2) === 'ar') {
                    name = names.empyreal.titles[Math.floor(Math.random() * 4)].capitalize() + name;

                } else {
                    name = names.empyreal.titles[Math.floor(Math.random() * 4) + 4].capitalize() + name;
                }

            } else {
                name += names.empyreal.femaleSuffixes[Math.floor(Math.random() * names.empyreal.femaleSuffixes.length)];
            }

            return name;
        }
    };
}]);
