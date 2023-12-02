export default function stringIdSort(a, b) {
    const idA = typeof a.id === 'number' ? a.id : parseInt(a.id, 10);
    const idB = typeof b.id === 'number' ? b.id : parseInt(b.id, 10);

    return idA - idB;
}
