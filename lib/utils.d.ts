export declare const projectFile = "/package.json";
export declare const androidFile = "/android/app/build.gradle";
export declare const iosFile = "/ios/App/App/Info.plist";
export declare function getProjectVersion(options: {
    dir: string;
}): string | null;
export declare function getAndroidVersion(options: {
    dir: string;
}): string | null;
export declare function setAndroidVersion(options: {
    dir: string;
    version: string;
}): void;
export declare function getAndroidBuild(options: {
    dir: string;
}): number | null;
export declare function setAndroidBuild(options: {
    dir: string;
    build: number;
}): void;
export declare function getIOSVersion(options: {
    dir: string;
}): string | null;
export declare function setIOSVersion(options: {
    dir: string;
    version: string;
}): void;
export declare function getIOSBuild(options: {
    dir: string;
}): number | null;
export declare function setIOSBuild(options: {
    dir: string;
    build: number;
}): void;
