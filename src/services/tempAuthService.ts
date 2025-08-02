/**
 * Servicio de autenticación temporal
 * Usar mientras se configuran las reglas de Firebase
 */

export class TempAuthService {
  // Credenciales hardcodeadas para desarrollo
  private static readonly TEMP_CREDENTIALS = [
    {
      username: 'admin',
      password: 'admin123'
    },
    {
      username: 'gownerbeats@gmail.com',
      password: 'admin123'
    }
  ];

  static authenticate(username: string, password: string): boolean {
    return this.TEMP_CREDENTIALS.some(cred => 
      username === cred.username && password === cred.password
    );
  }
}