"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIOSBuild = exports.getIOSBuild = exports.setIOSVersion = exports.getIOSVersion = exports.setAndroidBuild = exports.getAndroidBuild = exports.setAndroidVersion = exports.getAndroidVersion = exports.getProjectVersion = exports.iosFile = exports.androidFile = exports.projectFile = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = require("fs");
const plist = require("plist");
exports.projectFile = '/package.json';
exports.androidFile = '/android/app/build.gradle';
exports.iosFile = '/ios/App/App/Info.plist';
function getProjectVersion(options) {
    try {
        const file = fs.readFileSync(options.dir + exports.projectFile, 'utf-8');
        const obj = JSON.parse(file);
        return obj.version;
    }
    catch (error) {
        return null;
    }
}
exports.getProjectVersion = getProjectVersion;
function getAndroidVersion(options) {
    try {
        const file = fs.readFileSync(options.dir + exports.androidFile, 'utf-8');
        return file.split('versionName "')[1].split('"')[0];
    }
    catch (error) {
        return null;
    }
}
exports.getAndroidVersion = getAndroidVersion;
function setAndroidVersion(options) {
    const file = fs.readFileSync(options.dir + exports.androidFile, 'utf-8');
    const result = file.replace(/(.*(?:versionName[ \t]+).*)/g, `        versionName "${options.version}"`);
    fs.writeFileSync(options.dir + exports.androidFile, result, 'utf-8');
}
exports.setAndroidVersion = setAndroidVersion;
function getAndroidBuild(options) {
    try {
        const file = fs.readFileSync(options.dir + exports.androidFile, 'utf-8');
        const buid = file.split('versionCode ')[1].split('\n')[0];
        return parseInt(buid);
    }
    catch (error) {
        return null;
    }
}
exports.getAndroidBuild = getAndroidBuild;
function setAndroidBuild(options) {
    const file = fs.readFileSync(options.dir + exports.androidFile, 'utf-8');
    const result = file.replace(/(.*(?:versionCode).*)/g, `        versionCode ${options.build}`);
    fs.writeFileSync(options.dir + exports.androidFile, result, 'utf-8');
}
exports.setAndroidBuild = setAndroidBuild;
function getIOSVersion(options) {
    try {
        const file = fs.readFileSync(options.dir + exports.iosFile, 'utf-8');
        const parsed = plist.parse(file);
        return parsed.CFBundleShortVersionString;
    }
    catch (error) {
        return null;
    }
}
exports.getIOSVersion = getIOSVersion;
function setIOSVersion(options) {
    const file = fs.readFileSync(options.dir + exports.iosFile, 'utf-8');
    const parsed = plist.parse(file);
    parsed.CFBundleShortVersionString = options.version;
    const result = plist.build(parsed);
    fs.writeFileSync(options.dir + exports.iosFile, result, 'utf-8');
}
exports.setIOSVersion = setIOSVersion;
function getIOSBuild(options) {
    try {
        const file = fs.readFileSync(options.dir + exports.iosFile, 'utf-8');
        const parsed = plist.parse(file);
        return parseInt(parsed.CFBundleVersion);
    }
    catch (error) {
        return null;
    }
}
exports.getIOSBuild = getIOSBuild;
function setIOSBuild(options) {
    const file = fs.readFileSync(options.dir + exports.iosFile, 'utf-8');
    const parsed = plist.parse(file);
    parsed.CFBundleVersion = options.build.toString();
    const result = plist.build(parsed);
    fs.writeFileSync(options.dir + exports.iosFile, result, 'utf-8');
}
exports.setIOSBuild = setIOSBuild;
