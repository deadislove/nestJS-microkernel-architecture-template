export interface Plugins {
    initialize(): Promise<void> | void
    shutdown(): Promise<void> | void
}