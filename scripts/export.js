const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const http = require('http');
const config = require('../config');

const {
    interval
} = require('rxjs');
const {
    filter,
    first,
    mergeMap
} = require('rxjs/operators');

const RETRYABLE_FILE_ERRORS = new Set(['EBUSY', 'EPERM']);

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const renameWithRetry = async (sourcePath, targetPath, maxAttempts = 5) => {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            fs.renameSync(sourcePath, targetPath);
            return;
        } catch (err) {
            lastError = err;
            if (!RETRYABLE_FILE_ERRORS.has(err.code) || attempt === maxAttempts) {
                throw err;
            }
            await wait(200 * attempt);
        }
    }
    throw lastError;
};

const getUniqueFallbackPath = (directoryPath, fileName) => {
    let counter = 0;
    while (true) {
        const suffix = counter === 0 ? '-new' : `-new-${counter}`;
        const fallbackPath = path.join(directoryPath, `${fileName}${suffix}.pdf`);
        if (!fs.existsSync(fallbackPath)) {
            return fallbackPath;
        }
        counter++;
    }
};

const fetchResponse = () => {
    return new Promise((res, rej) => {
        try {
            const req = http.request(`http://localhost:${config.dev.port}/#/`, response => res(response.statusCode));
            req.on('error', (err) => rej(err));
            req.end();
        } catch (err) {
            rej(err);
        }
    });
};

const waitForServerReachable = () => {
    return interval(1000).pipe(
        mergeMap(async () => {
            try {
                const statusCode = await fetchResponse();
                if (statusCode === 200) return true;
            } catch (err) {}
            return false;
        }),
        filter(ok => !!ok)
    );
};
/*
const timedOut = timeout => {
    return new Promise(res => {
        setTimeout(res, timeout);
    });
};
*/
const convert = async () => {
    await waitForServerReachable().pipe(
        first()
    ).toPromise();

    console.log('Connected to server ...');
    console.log('Exporting ...');
    try {
        const fullDirectoryPath = path.join(__dirname, '../pdf/');
        const directories = getResumesFromDirectories();
        const browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });

        if (
            !fs.existsSync(fullDirectoryPath)
        ) {
            fs.mkdirSync(fullDirectoryPath);
        }

        for (const dir of directories) {
            const page = await browser.newPage();
            await page.goto(`http://localhost:${config.dev.port}/#/resume/` + dir.name, {
                waitUntil: 'networkidle2',
                timeout: 90000
            });

            await page.addStyleTag({
                content: `
                  @media print {
                    html, body, #app, .page-wrapper, .page-inner, .page, .resume {
                      height: auto !important;
                      min-height: auto !important;
                      max-height: none !important;
                      overflow: visible !important;
                    }
                  }
                `
            });

            const outputPath = path.join(fullDirectoryPath, dir.name + '.pdf');
            const tempPath = outputPath + '.tmp';
            await page.pdf({
                path: tempPath,
                format: 'A4',
                printBackground: true
            });
            await page.close();

            try {
                await renameWithRetry(tempPath, outputPath);
            } catch (moveErr) {
                // Windows keeps PDFs locked while open in a viewer.
                if (RETRYABLE_FILE_ERRORS.has(moveErr.code)) {
                    const fallbackPath = getUniqueFallbackPath(fullDirectoryPath, dir.name);
                    await renameWithRetry(tempPath, fallbackPath);
                    console.warn(`Could not overwrite locked file: ${outputPath}. Wrote ${fallbackPath} instead.`);
                } else {
                    throw moveErr;
                }
            }
        }
        await browser.close();
    } catch (err) {
        throw new Error(err);
    }
    console.log('Finished exports.');
};

const getResumesFromDirectories = () => {
    const directories = getDirectories();
    return directories
    .map(dir => {
        const fileName = dir.replace('.vue', '');
        return {
            path: fileName,
            name: fileName
        };
    });
};

const getDirectories = () => {
    const srcpath = path.join(__dirname, '../src/resumes');
    return fs.readdirSync(srcpath)
    .filter(file => file !== 'resumes.js' && file !== 'template.vue' && file !== 'options.js');
};

convert();
