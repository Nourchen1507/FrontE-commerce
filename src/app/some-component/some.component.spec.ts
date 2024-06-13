import { TestBed } from '@angular/core/testing';
import { UserService } from '../services/user.service';
import { MockUserService } from '../mocks/user.service.mock';

describe('SomeComponent', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    });

    userService = TestBed.inject(UserService);
  });

  it('should use the mock service', () => {
    expect(userService).toBeTruthy();
    expect(userService instanceof MockUserService).toBe(true);
    // Ajoutez des tests supplémentaires ici
  });
});
