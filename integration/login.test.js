describe('addLogin', () => {
    it('LoginPage example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:3000/login');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});