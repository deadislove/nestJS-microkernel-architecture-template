import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('UserController (e2e', () => {

    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/user (GET)', async () => {

        const response = await request(app.getHttpServer())
            .get('/user')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toBeDefined()

        // expect(Array.isArray(response.body)).toBe(true); // if expecting a list of users

        // // You can also check that at least one user exists and has expected properties
        // if (response.body.length > 0) {
        //     expect(response.body[0]).toHaveProperty('id');
        //     expect(response.body[0]).toHaveProperty('name');
        // }
    });
})