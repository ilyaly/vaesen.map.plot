import MALES from "./assets/maleNames.json"
import FEMALES from "./assets/femaleNames.json"
import TOWNS from './assets/scandinavianTowns.json'
import CITIES from './assets/scandinavianCities.json'
import VAESENS from './assets/vaesens.json'
import VILLAIN_MOTIVATIONS from './assets/villainMotivation.json'

let vaesens_acts = [];
VAESENS.forEach(vaesen => function(){
    vaesens_acts.push()
})

const VAESEN_STATES_OF_MIND = [
    "frightened",
    "fleeing",
    "hateful",
    "murderous",
    "pining",
    "jealous",
    "scornful",
    "mischievous",
    "confused",
    "insane",
    "protective",
    "territorial"
];

const VAESENS_TYPES = [
    "habitat defender",
    "predator",
    "trickster",
    "avenger",
    "humanoid"
]

const HABITATS = [
    "village surroundings",
    "town surroundings",
    "village",
    "town",
    "city"
];


const REASONS = [
    "destroyed vaesen's home",
    "made people stop appeasing vaesen",
    "has been hunting vaesen",
    "has been threatening vaesen",
    "made people stop worshipping vaesen",
    "stole something from vaesen",
    "enchanted and bounded vaesen by magic"
]


const POWER_MOTIVATIONS = [
    'take place in society',
    'hide the truth and keep social status',
    'get rid of the political competitor'
]

const MONEY_MOTIVATIONS = [
    'take place in society',
    'hide the truth and keep social status',
    'get rid of the political competitor'
]

const VICTIMS_ALLIES = [
    {
        "relation": "friend",
        "gender": "any"
    },
    {
        "relation": "colleague",
        "gender": "any"
    },
    {
        "relation": "apprentice",
        "gender": "same"
    },
    {
        "relation": "chief",
        "gender": "same"
    },
    {
        "relation": "brother",
        "gender": "male"
    },
    {
        "relation": "father",
        "gender": "male"
    },
    {
        "relation": "sister",
        "gender": "female"
    },
    {
        "relation": "mother",
        "gender": "female"
    },
    {
        "relation": "wife",
        "gender": "female"
    },
    {
        "relation": "husband",
        "gender": "male"
    }
];

const WAY_OF_INVITATION = [
    "One of the society members received a telegraph message from",
    "One of the society members received a letter from",
    "In the morning one of the society members found a nailed box at the castle gates, inside there is a note from",
    "Last night a scruffy homing pigeon brought a note from",
    "One of the society members had a dream, in which there was a message from",
    "During the dinner, every member of the society has heard a message delivered by the voice of",
    "One of the society members can't get over the words of the local madman",
    "One of the society members can't get over the ad in a yesterday's newspaper, authored by",
];

function getVaesenByHabitat(VAESENS, habitat) {
    VAESENS.filter(vaesen => {
        return vaesen.habitats.includes(habitat)
    })
}


function randomFeature(arrayOfFeatures) {
    return arrayOfFeatures[Math.floor(Math.random() * arrayOfFeatures.length)];
}

export default function generatePlot() {
    const placeType = Math.random() < 0.5 ? "town" : "city";
    const place = placeType ==='town' ? randomFeature(TOWNS) : randomFeature(CITIES);
    const wayOfInvitation = randomFeature(WAY_OF_INVITATION);
    const vaesenStateOfMind = randomFeature(VAESEN_STATES_OF_MIND);
    const vaesen = randomFeature(VAESENS);
    const act = randomFeature(vaesen.acts)
    const habitat = randomFeature(vaesen.habitats)
    const trigger = randomFeature(vaesen.triggers)

    const reason = randomFeature(REASONS);

    const victimGender = Math.random() < 0.5 ? "male" : "female";
    const victimName = victimGender === "male" ? randomFeature(MALES) : randomFeature(FEMALES);

    const villainGender = Math.random() < 0.5 ? "male" : "female";
    const villainName = villainGender === "male" ? randomFeature(MALES) : randomFeature(FEMALES);

    const invitorGender = Math.random() < 0.5 ? "male" : "female";
    const invitorName = invitorGender === "male" ? randomFeature(MALES) : randomFeature(FEMALES);

    const villainMotivation = randomFeature(VILLAIN_MOTIVATIONS)


    const invitation = `
        ${wayOfInvitation} <i>${invitorName}</i>,
         who reports that a mysterious ${act.type} has happened in the ${placeType} of <i>${place.name}</i>.
    `

    const conflict = `
        A ${vaesenStateOfMind} <i>${vaesen.name}</i> in a <i>${place.name}</i> ${placeType} has ${act.text} <i>${victimName}</i> because they ${trigger} by <i>${villainName}</i>.
    `
    const subcoflict = `<i>${villainName}</i> had a lack of ${villainMotivation.type} so they used vaesen to get ${villainMotivation.name} from <i>${victimName}</i>.

    `
    return {
        "place": place,
        "placeType" : placeType,
        "invitor" : invitorName,
        "vaesen" : vaesen.name,
        "victim" : victimName,
        "villain" : villainName,
        "incident": act.type.charAt(0).toUpperCase() + act.type.slice(1),
        "invitation": invitation,
        "conflict": conflict,
        "subcoflict" : subcoflict
    }


}