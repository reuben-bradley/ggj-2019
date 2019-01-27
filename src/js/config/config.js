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
        meter: {
            fontFamily: 'Arial',
            fontSize: 24,
            color: 'white'
        },
        control: {
            fontFamily: 'Arial',
            fontSize: 28,
            color: 'cyan'
        },
        score: {
            fontFamily: 'Montserrat',
            fontSize: 28,
            color: '#bb0000',
            padding: {
                x: 5,
                y: 1
            }
        },
        gameover: {
            fontFamily: 'Bangers',
            fontSize: 82,
            color: '#bb0000',
            padding: {
                x: 5,
                y: 1
            }
      },
    },
    partyTickTime: 500,
    newPersonSpawnTime: 6000,
    happinessDecline: -2,
    happinessGrowth: 1,
    minPersonDanceFrameTime: 120,
    maxPersonDanceFrameTime: 960,
    partyPrefs: {
        heat: ['cold', 'warm', 'hot'],
        light: ['ambience', 'high'],
        music: ['pop', 'synthwave', 'rock']
    },
    partyDuration: 5,
    partySpeedFactor: 0.05,
    personEnterExitPoint: {
        x: 0,
        y: 550
    }
};

export default config;
