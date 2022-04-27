import { Command, flags } from '@oclif/command';
declare class CapacitorSetVersion extends Command {
    static description: string;
    static flags: {
        version: flags.IOptionFlag<string | undefined>;
        build: import("@oclif/parser/lib/flags").IOptionFlag<number | undefined>;
        android: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        ios: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        quiet: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        info: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
    };
    static args: {
        name: string;
        description: string;
        required: boolean;
    }[];
    private quiet;
    run(): Promise<void>;
    private getDir;
    private getVersion;
}
export = CapacitorSetVersion;
