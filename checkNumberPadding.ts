// Function to check the consistency of number padding in a sequence of strings.
export function checkNumberPadding(intStrs: Iterable<string>): number {
    if (!intStrs) {
        throw new Error("Input cannot be null or undefined.");
    }

    const lengths: Set<number> = new Set();
    const paddedLengths: Set<number> = new Set();

    let minLength = Infinity;
    let hasPadding = false;

    for (const str of intStrs) {
        if (typeof str !== 'string') {
            throw new Error(`Invalid input type: Expected string, received ${typeof str}.`);
        }

        if (Number.isNaN(parseInt(str))) {
            throw new Error('Invalid number.');
        }

        const match = /^0+/.exec(str);
        if (match) {
            hasPadding = true;
            paddedLengths.add(str.length);
        }

        lengths.add(str.length);
        if (str.length < minLength) {
            minLength = str.length;
        }
    }

    if (lengths.size === 0) {
        // Nothing to observe
        return 0;
    }

    if (hasPadding) {
        if (paddedLengths.size === 1) {
            // Consistent padding length
            const paddingLength = paddedLengths.values().next().value;
            return paddingLength;
        } else {
            // Inconsistent padding lengths
            return -1;
        }
    } else {
        // No padding observed
        return -minLength;
    }
}
