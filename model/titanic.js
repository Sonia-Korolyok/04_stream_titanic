function calcTotalFare(rows){
    if (!Array.isArray(rows) || rows.length === 0) return 0;
    return rows.reduce((sum, row) => {
        const fare = parseFloat(row?.Fare);
        return sum + (isNaN(fare) ? 0 : fare);}, 0);}

function calcAverageFareByClass(rows) {
    const fareByClass = { 1: [], 2: [], 3: [] };

    rows.forEach(row => {
        const fare = parseFloat(row.Fare);
        const pclass = row.Pclass;
        if (!isNaN(fare) && fareByClass[pclass]) {
            fareByClass[pclass].push(fare);
        }
    });
    const result = {};
    Object.entries(fareByClass).forEach(([cls, fares]) => {
        if (fares.length > 0) {
            result[cls] = fares.reduce((a, b) => a + b, 0) / fares.length;
        } else {
            result[cls] = 0;
        }
    });
    return result;
}

function calcSurvivalStats(rows) {
    let survived = 0;
    let notSurvived = 0;
    rows.forEach(row => {
        const v = (row.Survived || '').toString().trim();
        if (v === '1') survived++;
        else if (v === '0') notSurvived++;
    });

    return {
        survived,
        notSurvived
    };
}

function calcGroupStats(rows) {
    const groups = {
        men: { survived: 0, died: 0 },
        women: { survived: 0, died: 0 },
        children: { survived: 0, died: 0 }
    };

    rows.forEach(row => {
        const age = parseFloat(row.Age);
        const sex = (row.Sex || '').toLowerCase();
        const survived = row.Survived === '1' || row.Survived === 1;

        if (!isNaN(age) && age < 18) {
            groups.children[survived ? 'survived' : 'died']++;
        } else if (sex === 'male') {
            groups.men[survived ? 'survived' : 'died']++;
        } else if (sex === 'female') {
            groups.women[survived ? 'survived' : 'died']++;
        }
    });

    return groups;
}

export { calcTotalFare, calcAverageFareByClass, calcSurvivalStats, calcGroupStats };