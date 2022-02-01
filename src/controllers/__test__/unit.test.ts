import { app } from '../../app';
import request from 'supertest';
import {User} from '../../models/user';

describe('signup', () => {
    it('should return status 422 if email is missing', async () => {
        const res = await request(app).post('/signup').send({password: '1234', name: 'qwerty'});

        expect(res.statusCode).toEqual(422);
    });
    it('should return status 422 if name is missing', async () => {
        const res = await request(app).post('/signup').send({email: 'abc@abc.com', password: '1234'});
       
        expect(res.statusCode).toEqual(422);
    });
    it('should return status 422 if password is missing', async () => {
        const res = await request(app).post('/signup').send({email: 'abc@abc.com', name: 'qwerty'});
        
        expect(res.statusCode).toEqual(422);
    });
});

describe('signup', () => {
    it('should return status 422 if email already exists', async () => {
        const mockUserFind = jest.fn();
        mockUserFind.mockResolvedValue({});
        User.findOne = mockUserFind;
        const res = await request(app).post('/signup').send({email: 'abc@abc.com', name: 'qwerty', password: '1234'});
        expect(res.statusCode).toEqual(422);
        expect(res.body).toEqual({error:"user already exists with that email"});
    });
});