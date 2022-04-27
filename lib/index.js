"use strict";
const command_1 = require("@oclif/command");
const semver = require("semver");
const fs = require("fs");
const utils = require("./utils");
const exit_code_1 = require("./exit-code");
class CapacitorSetVersion extends command_1.Command {
    constructor() {
        super(...arguments);
        this.quiet = false;
    }
    async run() {
        const { args, flags } = this.parse(CapacitorSetVersion);
        if (!flags.android && !flags.ios) {
            flags.android = true;
            flags.ios = true;
        }
        if (flags.quiet) {
            this.quiet = true;
        }
        const dir = this.getDir(args);
        const version = this.getVersion(dir, flags.version);
        if (!this.quiet) {
            this.log('version: ' + version);
        }
        if (!this.quiet && flags.build) {
            this.log('build: ' + flags.build);
        }
        if (flags.android) {
            const androidVersion = utils.getAndroidVersion({ dir });
            const androidBuild = utils.getAndroidBuild({ dir });
            if (!androidVersion || !androidBuild) {
                this.error(`Invalid android settings: ${androidVersion}:${androidBuild}`, {
                    exit: exit_code_1.ExitCode.ERROR_ANDROID,
                });
            }
            utils.setAndroidVersion({ dir, version });
            const build = flags.build ? flags.build : androidBuild + 1;
            utils.setAndroidBuild({ dir, build: build });
            if (!this.quiet) {
                this.log(`Android version: ${androidVersion} -> ${version}`);
                this.log(`Android build: ${androidBuild} -> ${build}`);
            }
        }
        if (flags.ios) {
            const iosVersion = utils.getIOSVersion({ dir });
            const iosBuild = utils.getIOSBuild({ dir });
            if (!iosVersion || !iosBuild) {
                this.error(`Invalid ios settings: ${iosVersion}`, { exit: exit_code_1.ExitCode.ERROR_IOS });
            }
            utils.setIOSVersion({ dir, version });
            const build = flags.build ? flags.build : iosBuild + 1;
            utils.setIOSBuild({ dir, build: build });
            if (!this.quiet) {
                this.log(`iOS version: ${iosVersion} -> ${version}`);
                this.log(`iOS build: ${iosBuild} -> ${build}`);
            }
        }
        if (!this.quiet) {
            this.log('Done!');
        }
    }
    getDir(args) {
        if (!fs.existsSync(args.dir)) {
            this.error('Project directory does not exist', { exit: exit_code_1.ExitCode.ERROR_PROJECT });
        }
        return args.dir;
    }
    getVersion(dir, version) {
        const result = version ? version : utils.getProjectVersion({ dir });
        if (!result || !semver.valid(result)) {
            this.error(`Invalid version: ${version}`, { exit: exit_code_1.ExitCode.ERROR_VERSION });
        }
        return result;
    }
}
CapacitorSetVersion.description = 'Set Android and iOS app version and build number for capacitorjs projects.';
CapacitorSetVersion.flags = {
    version: command_1.flags.string({ char: 'v', description: 'Set specific version', helpValue: 'x.x.x' }),
    build: command_1.flags.integer({ char: 'b', description: 'Set specific build', helpValue: '10' }),
    android: command_1.flags.boolean({ char: 'a', description: 'Android only' }),
    ios: command_1.flags.boolean({ char: 'i', description: 'iOS only' }),
    quiet: command_1.flags.boolean({ char: 'q', description: 'Print only error messages' }),
    info: command_1.flags.version({ char: 'm', description: 'Print tool version' }),
    help: command_1.flags.help({ char: 'h', description: 'Show help' }),
};
CapacitorSetVersion.args = [{ name: 'dir', description: 'Capacitor project root directory', required: true }];
module.exports = CapacitorSetVersion;
