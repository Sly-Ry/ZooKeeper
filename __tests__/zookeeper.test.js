const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeeper');
const { zookeepers } = require('../data/zookeeper');

jest.mock('fs');
test('creates an zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: 'Ryan', id: '13' },
        zookeepers
    );

    expect(zookeeper.name).toBe('Ryan');
    expect(zookeeper.id).toBe('13');

});

test('filters by query', () => {
    const startingZookeeper = [
        {
            id: "2",
            name: "Holland",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
        },
    ];
    
    const updatedZookeeper = filterByQuery({ age: 31 }, startingZookeeper);

    expect(updatedZookeeper.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeeper = [
        {
            id: "2",
            name: "Phil",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "3",
            name: "Ricky",
            age: 67,
            favoriteAnimal: "bear",
        },
    ];
    
    const result = findById('3', startingZookeeper);

    expect(result.name).toBe('Ricky');
});

test('validates personality traits', () => {
    const zookeeper = {
        id: "2",
        name: "Holland",
        age: 31,
        favoriteAnimal: "penguin",
    };
    
      const invalidZookeeper = {
        id: "3",
        name: "Isabella",
        age: "67",
        favoriteAnimal: "bear",
    };
    
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});
