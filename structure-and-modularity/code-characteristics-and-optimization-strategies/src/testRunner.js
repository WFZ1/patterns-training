export const runTests = (testConfig) => {
    const tests = Object.entries(testConfig);

    const passedTestsCount = tests.reduce((sum, test, index) => {
        const testTitle = test[0];
        const testCase = test[1];
        const title = `Test (${index + 1}) ${testTitle}`;

        try {
            testCase();
            console.log(`✅ ${title} passed`);
            return sum + 1
        } catch (error) {
            console.error(`❌ ${title} failed: ${error.message}`);
        }

        return sum
    }, 0);

    console.log(`\nTest summary: ${passedTestsCount}/${tests.length} tests passed`);
}