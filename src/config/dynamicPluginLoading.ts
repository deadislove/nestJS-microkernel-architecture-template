import { DynamicModule, Module, OnModuleDestroy, OnModuleInit, Type } from "@nestjs/common";
import { CoreModule } from "@core/core.module";
import { ProductModule } from "@plugins/product/product.module";
import { UserModule } from "@plugins/user/user.module";
import { pluginRegistry } from "@plugins/core/plugin.registry";
import { DatabaseModule } from "@infra/database/database.module";

@Module({})
export class DynamicModuleLoader implements OnModuleInit, OnModuleDestroy {
    static loadDynamicModules(): DynamicModule {
        const modules: Array<Type<any>> = []

        // Infra
        modules.push(DatabaseModule)

        modules.push(CoreModule)
        
        modules.push(UserModule)
        modules.push(ProductModule)

        return {
            module: DynamicModuleLoader,
            imports: modules,
        };
    }

    async onModuleInit() {
        console.log('DynamicModuleLoader: Initializing plugins...')
        await pluginRegistry.InitializeAll()
    }

    async onModuleDestroy() {
        console.log('DynamicModuleLoader: Shutting down plugins...')
        await pluginRegistry.ShoutdownAll()
    }
}