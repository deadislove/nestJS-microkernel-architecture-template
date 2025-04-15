import { Module } from "@nestjs/common";
import { CoreService } from "./core.service";
import { LoggerModule } from "./logger/logger.module";

@Module({
    imports: [
        LoggerModule,
    ],
    providers: [
        CoreService
    ],
    exports: [
        LoggerModule,
    ]
})

export class CoreModule{}