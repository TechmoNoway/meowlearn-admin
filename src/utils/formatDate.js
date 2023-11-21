export function sqlDate() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    return formattedDate;
}
