# 🔧 Solución: Error de Permisos en Firestore

## ❌ Error Actual
```
Missing or insufficient permissions
```

## 🎯 Solución Rápida (2 minutos)

### Paso 1: Ir a Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto

### Paso 2: Configurar Reglas de Firestore
1. En el menú lateral, haz clic en **"Firestore Database"**
2. Haz clic en la pestaña **"Reglas"** (Rules)
3. Reemplaza las reglas actuales con esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura para desarrollo
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Paso 3: Publicar las Reglas
1. Haz clic en **"Publicar"** (Publish)
2. Confirma la acción

## ⚠️ IMPORTANTE para Producción

Las reglas arriba son **SOLO PARA DESARROLLO**. Para producción, usa estas reglas más seguras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública de productos y colecciones
    match /shirts/{document} {
      allow read: if true;
      allow write: if false; // Solo admins pueden escribir
    }
    
    match /collections/{document} {
      allow read: if true;
      allow write: if false; // Solo admins pueden escribir
    }
    
    match /admins/{document} {
      allow read, write: if true; // Para setup inicial
    }
  }
}
```

## 🚀 Después de Cambiar las Reglas

Ejecuta esto en tu terminal:

```bash
# Crear usuario admin
npm run migrate-data
```

## 🔐 Luego Podrás Acceder con:
- **URL:** http://localhost:5174/admin
- **Usuario:** admin  
- **Contraseña:** admin123

---

## 📱 Si Aún No Funciona

### Opción Alternativa: Modo de Prueba
1. En Firestore, haz clic en "Comenzar en modo de prueba"
2. Esto permite lectura/escritura por 30 días
3. Ideal para desarrollo inicial

### Verificar Configuración
Asegúrate de que tu `.env.local` tenga todas las variables:
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc123
```

¡Una vez hecho esto, tu panel admin funcionará perfectamente! 🎉