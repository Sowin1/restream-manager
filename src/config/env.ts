import 'dotenv/config'
import process from 'node:process';

class EnvironementVariable {
    private platforms = new Map<string, string | null>();
    readonly port: number;
    private sourceUrl: string;


    constructor() {
        const platformsToLoad = ['YOUTUBE', 'TWITCH', 'KICK', 'TIKTOK'];
        try {
            this.port = Number(process.env.PORT) || 3000;
            const sourceUrl = process.env.MEDIAMTX_URL;

            if (!sourceUrl) {
                throw new Error("Source origin is not defined");
            }

            this.sourceUrl = sourceUrl;

            platformsToLoad.forEach((plateform) => {
                const plateformUrl = process.env[`${plateform}_URL`] || null
                // TO:DO If a plateform is null log it into the logger
                this.platforms.set(plateform, plateformUrl)
            })
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message)
            } else {
                console.error("Unknown error while loading environment variables")
            }
            process.exit(1)
        }
    }

    public initFluxAvailable(){
        
    }

    public getSourceUrl(): string {
        return this.sourceUrl;
    }
}
