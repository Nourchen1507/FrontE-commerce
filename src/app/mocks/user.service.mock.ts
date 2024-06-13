import { Observable, of } from 'rxjs';
import { User } from '../Model/User'; // Assurez-vous que le chemin d'importation est correct
import { UserService } from '../services/user.service'; // Assurez-vous que le chemin d'importation est correct

class MockUserService {
  registerUser(user: User): Observable<any> {
    return of({ success: true });
  }
}

export { MockUserService };
