
import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;
    let userId: string;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        }).compile();

        // usersService = moduleRef.get<UsersService>(UsersService);
        usersService = await moduleRef.resolve(UsersService);
        usersController = moduleRef.get<UsersController>(UsersController);
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const result: User[] = await usersService.findAll();
            jest.spyOn(usersService, 'findAll').mockResolvedValue(result);

            expect(await usersController.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('shoud return created user', async () => {
            const result: User = await usersService.create({
                username: 'tester-account',
                password: 'Str0ngP@sSw0rd44!',
                email: 'tester@fakemail.net',
                pronouns: 'elle'
            });
            userId = result._id.toString();
            jest.spyOn(usersService, 'create').mockResolvedValue(result);

            expect(await usersController.create({
                username: 'tester-account',
                password: 'Str0ngP@sSw0rd44!',
                email: 'tester@fakemail.net',
                pronouns: 'elle'
            })).toBe(result)
        })
    })

    describe('findOne', () => {
        it('should return targetted user', async () => {
            const result: User = await usersService.findOne(userId);
            jest.spyOn(usersService, 'findOne').mockResolvedValue(result);

            expect(await usersController.findOne(userId)).toBe(result);
        });
    });

    describe('update', () => {
        it('shoud return updated user', async () => {
            const result: User = await usersService.update(userId, {
                username: 'tester-account',
                password: 'Str0ngP@sSw0rd44!',
                email: 'tester@fakemail.net',
                pronouns: 'iel'
            });
            jest.spyOn(usersService, 'update').mockResolvedValue(result);

            expect(await usersController.update(userId, {
                username: 'tester-account',
                password: 'Str0ngP@sSw0rd44!',
                email: 'tester@fakemail.net',
                pronouns: 'iel'
            })).toBe(result)
        })
    })

    describe('remove', () => {
        it('should return deleted user', async () => {
            const result: User = await usersService.remove(userId);
            jest.spyOn(usersService, 'remove').mockResolvedValue(result);

            expect(await usersController.remove(userId)).toBe(result);
        });
    });

});
