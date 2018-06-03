import results from './results.hbs';
import { header, styleID } from 'src/server/api/react/utilities';
import { appID } from 'common/utilities';
import { renderApp } from 'src/server/api/react/render';
import { setupProps } from 'src/server/api/react/utilities';
import processData from 'src/server/api/user-data/processor';
import { getStatistics } from 'src/server/api/statistics';
import {
    requestPersonalData,
    requestAudioFeatures
} from 'src/server/api/user-data/request-handler';
export function getAccessToken(req, res, next) {
    const token = req.query.accessToken;
    res.locals.accessToken = token;
    return next();
}

export async function getUserData(req, res, next) {
    const token = res.locals.accessToken;
    try {
        const result = await requestPersonalData(token, 50);
        res.locals.data = result;
        return next();
    } catch (error) {
        return next(error);
    }
}

export async function processUserData(req, res, next) {
    const rawData = res.locals.data;
    const token = res.locals.accessToken;
    const processedData = processData(rawData);
    const audioFeatures = await requestAudioFeatures(
        token,
        processedData.tracks
    );
    res.locals.data = {
        userData: processedData,
        audioFeatures: audioFeatures
    };
    return next();
}

export function getAudioStats(req, res, next) {
    res.locals.data.statistics = getStatistics(res.locals.data.audioFeatures);
    return next();
}

export function setupDevelopmentAssets(req, res, next) {
    /* if we're in development mode, the res.locals.data will
        not have been set up. we need to check for this. We also use dummy
        data to speed up dev so we're not continuosly making spotify server requests
    */
    const fakeData = require('fixtures/spotify/processed-data/payload').default;
    res.locals.data = {
        userData: {
            artists: fakeData.artists,
            tracks: fakeData.tracks
        },
        statistics: fakeData.statistics
    };
    return next();
}

export function setupReactProps(req, res, next) {
    const artistProps = setupProps(
        res.locals.data.userData.artists,
        styleID.ARTISTS,
        header.ARTISTS
    );

    const tracksProps = setupProps(
        res.locals.data.userData.tracks,
        styleID.TRACKS,
        header.TRACKS
    );

    res.locals.data.react = {
        props: {
            artists: artistProps,
            tracks: tracksProps
        }
    };

    return next();
}

export function generateReactApps(req, res, next) {
    const artists = renderApp(res.locals.data.react.props.artists);
    const tracks = renderApp(res.locals.data.react.props.tracks);
    res.locals.data.react.apps = {
        artists: artists,
        tracks: tracks
    };
    return next();
}

export function renderResults(req, res, next) {
    const obj = {
        dev: process.env.NODE_ENV !== 'production' ? true : false,
        title: 'Results',
        react: {
            props: res.locals.data.react.props,
            apps: res.locals.data.react.apps
        },
        ids: {
            app: appID,
            style: styleID
        }
    };
    const payload = results(obj);
    res.send(payload);
    return next();
}

export function errorHandler(err, req, res, next) {
    if (err.statusCode === 401) {
        /* the user's access token has expired.
        redirect back to the main page for a refresh */
        res.redirect('/');
    } else {
        if (process.env.NODE_ENV !== 'test') {
            console.error(err.stack);
        }
        res.status(500).send('Internal Server Error');
    }
}
