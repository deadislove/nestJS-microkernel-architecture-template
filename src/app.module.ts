import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamicModuleLoader } from '@config/dynamicPluginLoading';


@Module({
  imports: [
    DynamicModuleLoader.loadDynamicModules()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
