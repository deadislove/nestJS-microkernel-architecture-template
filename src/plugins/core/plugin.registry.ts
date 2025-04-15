import { Plugins } from "./plugin.interface";

export class PluginRegistry {

    private plugins: Map<string, Plugins> = new Map()

    Register<T extends Plugins>(key: string, plugin: T) {
        console.log(`Registered: ${key}`)
        return this.plugins.set(key, plugin)
    }

    Get<T extends Plugins>(key: string): T | undefined {
        return this.plugins.get(key) as T
    }

    async InitializeAll() {
        for(const plugin of this.plugins.values()) {
            await plugin.initialize?.()
        }
    }

    async ShoutdownAll() {
        for(const plugin of this.plugins.values()) {
            await plugin.shutdown?.()
        }
    }
}

// Singleton instance of PluginRegistry
export const pluginRegistry = new PluginRegistry()