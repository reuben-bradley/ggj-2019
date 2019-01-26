import 'phaser';

const config = {
    canvas: {
        height: 600,
        width: 800
    },
    textStyles: {
        default: {
            fontFamily: 'Bangers',
            fontSize: 16,
            color: '#bb0000',
            padding: {
                x: 5,
                y: 1
            }
        },
        title: {
            fontFamily: 'Cinzel Decorative',
            fontSize: 42,
            fontWeight: 900,
            color: '#00bb00',
            padding: {
                x: 5,
                y: 1
            }
        },
        meter: {
            fontFamily: 'Arial',
            fontSize: 24,
            color: 'white'
        },
        control: {
            fontFamily: 'Arial',
            fontSize: 28,
            color: 'cyan'
        }
    },
    partyTickTime: 1000,
    newPersonSpawnTime: 6000,
    maxPersons: 10,
    happinessDecline: -2,
    happinessGrowth: 1,
    minPersonDanceFrameTime: 120,
    maxPersonDanceFrameTime: 960,
    personEnterExitPoint: {
        x: 0,
        y: 550
    }
};

export default config;
