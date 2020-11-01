// MUSIC THEORY FUNCTIONS ... MAYBE TO USE IN A SITE THAT HAS HELPFUL TOOLS FOR UNDERSTANDING FRETBOARD / MUSIC THEORY

// 0) fn returnNotesOfArpeggio that returns an array with notes of an arpeggio, given its root and type (done)
// 1) fn chordIdentifier that takes an array of notes and returns a list of chords it could be
// 2) fn arpeggioOnFretboard that takes the output from returnNotesOfArpeggio and represents it on a fretboard (or could do visually via web?)
// 3) fn findGuideTones that takes two chords that are input (root1, type1, root2, type2) find the closest note to its 3 or 7 & return number of semitones it is away


// Enharmonic equivalents depending on the key signature you're in
sharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
flat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

// Key signatures
natural = ['C']
flatKey = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'];
sharpKey = ['G', 'D', 'A', 'E', 'B', 'F#'];

// Arpeggio types made up of intervals on the interval obj
const arpeggioTypes = {
    Maj: ["Root", "Maj3", "Per5"],
    Maj7: ["Root", "Maj3", "Per5", "Maj7"],
    Min: ["Root", "Min3", "Per5"],
    Min7: ["Root", "Min3", "Per5", "Min7"],
    Dom7: ["Root", "Maj3", "Per5", "Min7"],
    HalfDim: ["Root", "Maj3", "Dim5", "Min7"],
    Dim: ["Root", "Min3", "Dim5", "bb7"],
    Aug: ["Root", "Maj3", "Aug5", "Min7"],
    Maj7Sharp5: ["Root", "Min3", "Aug5", "Maj7"],
    MinMaj7: ["Root", "Min3", "Per5", "Maj7"]
}

// Each interval represents semi-tone
const intervals = {
    Root: 0,
    Min2: 1,
    Maj2: 2,
    Min3: 3,
    Maj3: 4,
    Per4: 5,
    Tritone: 6,
    Aug4: 6,
    Dim5: 6,
    Per5: 7,
    Min6: 8,
    Aug5: 8,
    Maj6: 9,
    bb7: 9,
    Min7: 10,
    Aug6: 10,
    Maj7: 11,
    Oct: 0,
}

// returnNotesOfArpeggio returns an array with notes of an arpeggio, given its Root and type:
// E.g.: C, Maj7 should return ["C","E","G","Bb"]

function returnNotesOfArpeggio(Root, type) {
    // Check if Root is in a sharp or flat key sig
    let keySig = sharp.includes(Root) ? sharp : flat;

    //  Create array which contains the order of that arpeggio
    let arpeggioFormula = arpeggioTypes[type].map((x) => (intervals[x]));

    // Look through the array of notes relating to the keysig and return the notes
    let positionOfRoot = keySig.indexOf(Root);

    return arpeggioFormula.map((interval) =>
        (keySig[(positionOfRoot + interval) % 12])
    )
}
// Node interface to run fn:

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('\n*** ARPEGGIO HELPER *** \n \n Please enter any root to see its arpeggios: ', note => {
    if (note === "C" || sharp.includes(note) || flat.includes(flat)) {
        readline.question('\n Now please enter an arpeggio type: ', arpeggioType => {
            if (arpeggioTypes[arpeggioType]) {
                let result = returnNotesOfArpeggio(note, arpeggioType);

                console.log(`
                The notes in ${note} ${arpeggioType} arpeggio are: ${result}.\n
                The intervals from the root are: ${arpeggioTypes[arpeggioType]}.\n`)
                readline.close();
            }
            else {
                console.log("Sorry, I didn't recognise that arpeggio type.")
                readline.close();
            }
        })
    } else {
        console.log("Sorry, I didn't recognise that note.")
        readline.close();
    }
});
